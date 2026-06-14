import { supabase } from "../lib/supabase";

export async function uploadVideoToSupabase(file) {

  const fileName = `${Date.now()}_${file.name}`;

  const { error } = await supabase.storage
    .from("study-videos")
    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("study-videos")
    .getPublicUrl(fileName);

  return data.publicUrl;
}