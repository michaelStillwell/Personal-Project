UPDATE employee 
SET username = $2, password = $3, emp_type = $4
WHERE id = $1;