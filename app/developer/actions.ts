'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function upsertProject(formData: FormData) {
  const supabase = await createClient()

  const id = formData.get('id') as string | null
  const displayName = formData.get('display_name') as string
  const category = formData.get('category') as string
  const descriptionLong = formData.get('description_long') as string
  const imageUrl = formData.get('image_url') as string
  const githubRepoId = formData.get('github_repo_id') ? parseInt(formData.get('github_repo_id') as string) : null
  const isFeatured = formData.get('is_featured') === 'on'
  
  // Tech stack from comma separated string
  const techStackRaw = formData.get('tech_stack') as string
  const techStack = techStackRaw ? techStackRaw.split(',').map(item => item.trim()) : []

  const projectData: any = {
    display_name: displayName,
    category: category,
    description_long: descriptionLong,
    image_url: imageUrl,
    tech_stack: techStack,
    github_repo_id: githubRepoId,
    is_featured: isFeatured,
  }

  let error;
  if (id && id !== 'new') {
    // Update
    const { error: updateError } = await supabase
      .from('projects_metadata')
      .update(projectData)
      .eq('id', id)
    error = updateError
  } else {
    // Insert
    const { error: insertError } = await supabase
      .from('projects_metadata')
      .insert([projectData])
    error = insertError
  }

  if (error) {
    console.error('Error upserting project:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/developer')
  return { success: true }
}

export async function deleteProject(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('projects_metadata')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting project:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/developer')
  return { success: true }
}
