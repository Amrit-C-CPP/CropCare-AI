#!/usr/bin/env python3
"""
generate_class_names.py
Run this script ONCE to extract the EXACT class names from the Kaggle dataset.

Requirements:
    pip install kaggle pandas

Setup:
    Make sure your Kaggle API credentials are at ~/.kaggle/kaggle.json
    You can download kaggle.json from: https://www.kaggle.com/settings -> API -> Create New Token

Usage:
    python generate_class_names.py
"""

import os
import sys
import json
import zipfile


def main():
    output_path = os.path.join(os.path.dirname(__file__), "model", "class_names.json")

    print("=" * 60)
    print("KrishiSalakar - Class Name Extractor")
    print("=" * 60)

    # Try to install required packages
    import subprocess
    subprocess.check_call(
        [sys.executable, "-m", "pip", "install", "kaggle", "pandas", "--quiet"],
    )

    try:
        import pandas as pd
        from kaggle.api.kaggle_api_extended import KaggleApi

        api = KaggleApi()
        api.authenticate()
        print("✓ Kaggle authentication successful")

        # Download ONLY the manifest_final.csv file (small file, not the 8GB images)
        download_dir = os.path.join(os.path.dirname(__file__), "temp_kaggle")
        os.makedirs(download_dir, exist_ok=True)

        print("\nDownloading manifest_final.csv from Kaggle (metadata only)...")
        try:
            # Try to download specific file from dataset
            api.dataset_download_file(
                dataset="adiithape1/plant-disease-detection-dataset-master-version",
                file_name="manifest_final.csv",
                path=download_dir,
                quiet=False,
            )
        except Exception:
            # The file might be nested inside a folder — try the nested path
            api.dataset_download_file(
                dataset="adiithape1/plant-disease-detection-dataset-master-version",
                file_name="MasterDataset/metadata/manifest_final.csv",
                path=download_dir,
                quiet=False,
            )

        # Find the CSV (might be zipped)
        manifest_path = os.path.join(download_dir, "manifest_final.csv")
        zip_path = manifest_path + ".zip"

        if not os.path.exists(manifest_path) and os.path.exists(zip_path):
            print("Extracting zip...")
            with zipfile.ZipFile(zip_path, "r") as z:
                z.extractall(download_dir)

        # Search recursively for the CSV
        if not os.path.exists(manifest_path):
            for root, _, files in os.walk(download_dir):
                for f in files:
                    if f == "manifest_final.csv":
                        manifest_path = os.path.join(root, f)
                        break

        if not os.path.exists(manifest_path):
            raise FileNotFoundError(f"manifest_final.csv not found in {download_dir}")

        df = pd.read_csv(manifest_path)
        print(f"✓ Loaded manifest with {len(df)} rows")

        # Extract alphabetically sorted class names from the training split
        if "split" in df.columns:
            class_names = sorted(df[df["split"] == "train"]["class"].unique().tolist())
        else:
            class_names = sorted(df["class"].unique().tolist())

        print(f"\n✓ Found {len(class_names)} unique classes (alphabetical order):\n")
        for i, name in enumerate(class_names):
            print(f"  [{i:3d}] {name}")

        # Save to JSON
        with open(output_path, "w") as f:
            json.dump(class_names, f, indent=2)

        print(f"\n✓ Saved to: {output_path}")
        print("✓ Please RESTART your backend server (Ctrl+C then python main.py)")

        # Cleanup temp dir
        import shutil
        shutil.rmtree(download_dir, ignore_errors=True)

    except Exception as e:
        print(f"\n✗ Error: {e}")
        print("\n" + "=" * 60)
        print("ALTERNATIVE: Run this in your Kaggle/Colab notebook instead:")
        print("=" * 60)
        print("""
import json
# Run this cell in the notebook where you trained the model:
class_names = sorted(train_dataset.classes)
print(f"Total classes: {len(class_names)}")
print(json.dumps(class_names, indent=2))

# OR if train_dataset is no longer in memory:
from torchvision import datasets
train_dataset = datasets.ImageFolder(train_dir)  # same train_dir as used in training
class_names = sorted(train_dataset.classes)
print(json.dumps(class_names, indent=2))
""")
        print("Then paste the printed JSON array into:")
        print(f"  {output_path}")


if __name__ == "__main__":
    main()
