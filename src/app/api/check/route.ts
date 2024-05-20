'use server'
import {NextResponse} from 'next/server';
import supabase from '@/supabase/supaBaseClient'; // Ensure this path is correct

export async function POST(request : Request, params : {
  action: string
}) {
  const formData = await request.formData();
  const name = formData.get('name'); // Corrected to get 'name' from formData
  try {
    console.log(name)
    let {data: website, error} = await supabase
     .from('websites')
     .select('id, visits')
     .eq('name', name)
     .single();

    if (error ||!website) {
      const {error } = await supabase
        .from('websites')
        .insert({ name: name});
        if(!error){
        const { error } = await supabase
          .from('websites')
          .update({visits: 1})
          .match({'name': name});
          return NextResponse.json('Success', {status: 200})
        }
        return NextResponse.json('Success', {status: 200})
    }

    // Increment the visits count
    const newVisitsCount = website.visits +  1;

    const {error: updateError} = await supabase
     .from('websites')
     .update({visits: newVisitsCount})
     .match({id: website.id});

    if (updateError) {
      throw new Error(updateError.message);
    }

    return NextResponse.json("Success", {status: 200});
  } catch (error) {
    console.error('Error updating website visits:', error);
    return NextResponse.json('Error', {status: 500}); 
  }
}