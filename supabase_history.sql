-- Create the scan_history table
CREATE TABLE IF NOT EXISTS public.scan_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    crop_name VARCHAR(100) NOT NULL,
    disease_name VARCHAR(255) NOT NULL,
    confidence NUMERIC(5, 2) NOT NULL,
    image_url TEXT,
    recommended_action TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.scan_history ENABLE ROW LEVEL SECURITY;

-- Allow users to insert their own scans
CREATE POLICY "Users can insert their own scans"
    ON public.scan_history
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Allow users to view their own scans
CREATE POLICY "Users can view their own scans"
    ON public.scan_history
    FOR SELECT
    USING (auth.uid() = user_id);

-- Allow users to delete their own scans
CREATE POLICY "Users can delete their own scans"
    ON public.scan_history
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_scan_history_modtime
    BEFORE UPDATE ON public.scan_history
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();
