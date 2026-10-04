import joblib
import traceback
import pandas as pd
import json

def main():
    print("Loading model personnel_stress_model.pkl...")
    try:
        model = joblib.load("personnel_stress_model.pkl")
        print("SUCCESS! Model loaded successfully!")
        print("Model Type:", type(model))
        
        classes = getattr(model, "classes_", None)
        print("Classes:", list(classes) if classes is not None else "None")
        
        feature_names = None
        if hasattr(model, "feature_names_in_"):
            feature_names = list(model.feature_names_in_)
        elif hasattr(model, "steps") and hasattr(model.steps[0][1], "feature_names_in_"):
            feature_names = list(model.steps[0][1].feature_names_in_)
            
        print(f"\nFeature Names Count: {len(feature_names) if feature_names else 0}")
        print("Feature Names:")
        print(json.dumps(feature_names, indent=2))
        
        # Check pipeline steps
        if hasattr(model, "steps"):
            print("\nPipeline Steps:")
            for name, step in model.steps:
                print(f"  Step '{name}': {type(step)}")
                if hasattr(step, "transformers_"):
                    print("    Transformers:")
                    for tname, trans, cols in step.transformers_:
                        print(f"      [{tname}] ({type(trans).__name__}): cols={cols}")
                        if hasattr(trans, "categories_"):
                            print(f"        categories length: {len(trans.categories_)}")
                            for col_idx, col_name in enumerate(cols):
                                cats = list(trans.categories_[col_idx])
                                print(f"          col '{col_name}': {cats}")
                                
        # Check predict_proba
        print("\nSupports predict_proba:", hasattr(model, "predict_proba"))
        
    except Exception as e:
        print("Error loading model:", e)
        traceback.print_exc()

if __name__ == "__main__":
    main()
