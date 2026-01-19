import { createClient } from '@/lib/supabase/client'
import type { Document, CreateDocumentInput, UpdateDocumentInput } from '@/types/document'
import { ensureProfileExists } from './checklist'

// ============================================
// Document Queries
// ============================================

export async function fetchUserDocuments(userId: string): Promise<Document[]> {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching documents:', error.message || error)
      return []
    }

    return data || []
  } catch (err) {
    console.error('Unexpected error fetching documents:', err)
    return []
  }
}

export async function uploadDocument(
  userId: string,
  file: File,
  metadata: {
    document_type: CreateDocumentInput['document_type']
    title?: string
    expiry_date?: string
    notes?: string
  },
  onProgress?: (progress: number) => void
): Promise<Document> {
  const supabase = createClient()

  // Ensure user profile exists first
  await ensureProfileExists(userId)

  // Generate a unique file path: documents/{userId}/{timestamp}_{filename}
  const timestamp = Date.now()
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
  const filePath = `${userId}/${timestamp}_${sanitizedName}`

  // Upload to storage
  const { error: uploadError } = await supabase.storage
    .from('Documents')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (uploadError) {
    console.error('Error uploading file:', uploadError)
    throw new Error(uploadError.message || 'Failed to upload file')
  }

  // Insert record in database
  const { data, error: insertError } = await supabase
    .from('documents')
    .insert({
      user_id: userId,
      document_type: metadata.document_type,
      title: metadata.title || file.name,
      file_path: filePath,
      file_size: file.size,
      mime_type: file.type,
      expiry_date: metadata.expiry_date || null,
      notes: metadata.notes || null,
      is_verified: true,
    })
    .select()
    .single()

  if (insertError) {
    // If database insert fails, try to clean up the uploaded file
    await supabase.storage.from('Documents').remove([filePath])
    console.error('Error inserting document record:', insertError)
    throw new Error(insertError.message || 'Failed to save document record')
  }

  return data
}

export async function updateDocument(
  docId: string,
  input: UpdateDocumentInput
): Promise<Document> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('documents')
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq('id', docId)
    .select()
    .single()

  if (error) {
    console.error('Error updating document:', error)
    throw error
  }

  return data
}

export async function deleteDocument(docId: string, filePath: string): Promise<void> {
  const supabase = createClient()

  // Delete from storage first
  const { error: storageError } = await supabase.storage
    .from('Documents')
    .remove([filePath])

  if (storageError) {
    console.error('Error deleting file from storage:', storageError)
    // Continue to delete database record even if storage delete fails
  }

  // Delete from database
  const { error: dbError } = await supabase
    .from('documents')
    .delete()
    .eq('id', docId)

  if (dbError) {
    console.error('Error deleting document record:', dbError)
    throw dbError
  }
}

export async function getDocumentUrl(filePath: string): Promise<string> {
  const supabase = createClient()

  // Create a signed URL with 15 minute expiry for security
  const { data, error } = await supabase.storage
    .from('Documents')
    .createSignedUrl(filePath, 900) // 15 minutes in seconds

  if (error) {
    console.error('Error creating signed URL:', error)
    throw error
  }

  return data.signedUrl
}

export async function downloadDocument(filePath: string): Promise<Blob> {
  const supabase = createClient()

  const { data, error } = await supabase.storage
    .from('Documents')
    .download(filePath)

  if (error) {
    console.error('Error downloading document:', error)
    throw error
  }

  return data
}
