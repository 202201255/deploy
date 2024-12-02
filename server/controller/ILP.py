# ipl_model.py
import pulp
import json
import sys
import traceback

# def #debug_log(message, data=None):
#     # Debug log function for development, disabled in production
#     pass

def run_ipl_model(input_data):
    """Run the IPL model with input preferences"""
    try:
        #debug_log("Starting IPL model with input", input_data)
        
        # Extract and validate input data
        students = input_data.get('student_preferences', {})
        course_limit = input_data.get('courseLimit', 120)
        numberOfAllocations = input_data.get('numberOfAllocations', 2)
        
        if not students:
            raise ValueError("No student data provided")
            
        #debug_log(f"Processing {len(students)} students")

        # Generate preference scores
        preference_scores = {}
        for student, preferences in students.items():
            preference_scores[student] = {course: max(2.5 - i * 0.5, 0) 
                                       for i, course in enumerate(preferences)}
        
        #debug_log("Generated preference scores")

        # Initialize optimization problem
        prob = pulp.LpProblem("Course_Allocation", pulp.LpMaximize)
        
        # Create decision variables
        x = {}
        for student, preferences in students.items():
            x[student] = {}
            for course in preferences:
                x[student][course] = pulp.LpVariable(
                    f"x_{student}_{course}".replace(" ", "_"), 
                    cat="Binary"
                )
        
        #debug_log("Created decision variables")

        # Calculate total scores
        total_score = {}
        for student in students:
            total_score[student] = pulp.lpSum(
                preference_scores[student][course] * x[student][course]
                for course in students[student]
            )
        
        # Set objective function
        prob += pulp.lpSum(total_score[student] for student in students)
        
        #debug_log("Set up objective function")

        # Add constraints
        for student in students:
            prob += pulp.lpSum(x[student][course] 
                             for course in students[student]) == numberOfAllocations
        
        all_courses = set(course for prefs in students.values() for course in prefs)
        for course in all_courses:
            prob += pulp.lpSum(x[student][course] 
                             for student in students if course in students[student]) <= course_limit
        
        #debug_log("Added constraints")

        # Solve the problem with suppressed solver output
        status = prob.solve(pulp.PULP_CBC_CMD(msg=False))
        #debug_log(f"Problem solved with status: {pulp.LpStatus[status]}")

        # Prepare results
        if pulp.LpStatus[status] == "Optimal":
            results = {
                'status': 'success',
                'allocations': {},
                'scores': {}
            }
            
            for student in students:
                allocated_courses = [
                    course for course in students[student] 
                    if pulp.value(x[student][course]) == 1
                ]
                score = pulp.value(total_score[student])
                
                results['allocations'][student] = allocated_courses
                results['scores'][student] = float(score)  # Convert to float for JSON serialization
            
            #debug_log("Generated results", results)
            return results
        else:
            return {
                'status': 'error',
                'message': f'No optimal solution found. Status: {pulp.LpStatus[status]}'
            }

    except Exception as e:
        #debug_log("Error in run_ipl_model", traceback.format_exc())
        return {
            'status': 'error',
            'message': str(e),
            'traceback': traceback.format_exc()
        }

def main():
    try:
        #debug_log("Starting main function")
        
        # Read input
        input_text = sys.stdin.read()
        #debug_log("Received input", input_text)
        
        # Parse input
        input_data = json.loads(input_text)
        #debug_log("Parsed input data")
        
        # Run model
        result = run_ipl_model(input_data)
        #debug_log("Got result from model", result)

        # Output result
        output_json = json.dumps(result)
        print(output_json, flush=True)
        
        #debug_log("Sent output")
        
    except Exception as e:
        error_result = {
            'status': 'error',
            'message': str(e),
            'traceback': traceback.format_exc()
        }
        #debug_log("Error in main", traceback.format_exc())
        sys.exit(1)

if __name__ == "__main__":
    main()
