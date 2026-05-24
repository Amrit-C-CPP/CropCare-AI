-- Enable the UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the crop_diseases table
CREATE TABLE IF NOT EXISTS public.crop_diseases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    crop_type VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    symptoms TEXT[] NOT NULL DEFAULT '{}',
    treatment TEXT[] NOT NULL DEFAULT '{}',
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.crop_diseases ENABLE ROW LEVEL SECURITY;

-- Allow public read access to diseases for the Wiki/API
CREATE POLICY "Allow public read access on crop_diseases"
    ON public.crop_diseases
    FOR SELECT
    USING (true);

-- Create a trigger to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_crop_diseases_modtime
    BEFORE UPDATE ON public.crop_diseases
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

-- Optional: Insert dummy data for testing
INSERT INTO public.crop_diseases (name, crop_type, description, symptoms, treatment, image_url)
VALUES 
    (
        'Late Blight', 
        'Potato', 
        'Late blight is a potentially devastating disease that can infect potato foliage and tubers at any stage of crop development.', 
        ARRAY['Dark, water-soaked spots on leaves', 'White mold on the undersides of leaves', 'Brown, dry rot on tubers'], 
        ARRAY['Apply fungicides prophylactically', 'Destroy infected plant debris', 'Plant resistant varieties'], 
        'https://example.com/late-blight.jpg'
    ),
    (
        'Apple Scab', 
        'Apple', 
        'Apple scab is a fungal disease that causes lesions on leaves and fruit, leading to premature defoliation and unmarketable fruit.', 
        ARRAY['Olive-green to black spots on leaves', 'Crusty, scabby lesions on fruit', 'Yellowing and dropping of infected leaves'], 
        ARRAY['Apply preventative fungicides in spring', 'Rake and destroy fallen leaves', 'Prune trees to improve air circulation'], 
        'https://example.com/apple-scab.jpg'
    );
