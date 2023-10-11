var apiUrl = 'https://dummy.restapiexample.com/api/v1';

//How many employees earn more than $300,000.00?
function getEmployees()
{
	var totalEmployes = 0;
	
	fetch(apiUrl + '/employees')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error al hacer la solicitud: ${response.status}`);
    }
    return response.json(); // Parsear la respuesta como JSON
  })
  .then(data => {
    
	   if (data && Array.isArray(data.data)) {
        // Recorrer la lista de empleados
        data.data.forEach(employee => {
          if(employee.employee_salary > 300000)
		  {
			  totalEmployes += 1;
		  }
        });
      }
	
    alert( totalEmployes + ' employees earn more than $300,000.00');
  })
  .catch(error => {
    console.error('Error al hacer la solicitud:', error);
  });

}

//Create a record with your name. You can use fake data for the other attributes.
//What’s your user id?
function newEmployee()
{
	var Employee = {
	  "employee_name": "Test Test CR",
	  "employee_salary": 8000555,
	  "employee_age": 19,
	  "profile_image": ""
	};
	
	var request = {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json' 
	  },
	  body: JSON.stringify(Employee) 
	};
	
	fetch(apiUrl + '/create', request)
	  .then(response => {
		if (response.ok) {
		  return response.json();
		} else {
		  throw new Error('Error al agregar un nuevo empleado');
		}
	  })
	  .then(data => {
		console.log('Nuevo empleado agregado:', data);
		//mostrar el id de empleado 
		alert('Employee ID: ' + data.data.id);
	  })
	  .catch(error => {
		console.error('Error:', error);
	  });
}