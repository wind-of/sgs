const citySelect = document.getElementById("city")
const departmentSelect = document.getElementById("department")
const employeeSelect = document.getElementById("employee")
const saveButton = document.getElementById("saveButton")

const cities = [
	{
		cityName: "Москва",
		departments: [
			{
				departmentName: "Цех 1",
				employees: ["Сотрудник 1", "Сотрудник 2"]
			},
			{
				departmentName: "Цех 2",
				employees: ["Сотрудник 3", "Сотрудник 4"]
			}
		]
	},
	{
		cityName: "Санкт-Петербург",
		departments: [
			{
				departmentName: "Цех 3",
				employees: ["Сотрудник 5", "Сотрудник 6"]
			},
			{
				departmentName: "Цех 4",
				employees: ["Сотрудник 7", "Сотрудник 8"]
			}
		]
	},
	{
		cityName: "Казань",
		departments: [
			{
				departmentName: "Цех 5",
				employees: ["Сотрудник 9", "Сотрудник 10"]
			}
		]
	}
]

function renderEmployees(employees) {
	employeeSelect.innerHTML = `<option value="">Выберите сотрудника</option>`
	employees.forEach(employee => {
		employeeSelect.innerHTML += `<option value="${employee}">${employee}</option>`
	})
}

function renderDepartments(departments) {
	departmentSelect.innerHTML = `<option value="">Выберите цех</option>`
	const departmentsNames = departments.map(dept => dept.departmentName)
	const employees = departments.map((dept => dept.employees)).flat()
	departmentsNames.forEach(dept => {
		departmentSelect.innerHTML += `<option value="${dept}">${dept}</option>`
	})
	renderEmployees(employees)
}

function renderCities(cities) {
	const citiesName = cities.map(city => city.cityName)
	citySelect.innerHTML = `<option value="">Выберите город</option>`
	citiesName.forEach(city => {
		citySelect.innerHTML += `<option value="${city}">${city}</option>`
	})
	renderDepartments(cities.map(city => city.departments).flat())
}


function updateDepartments() {
	const citySelect = document.getElementById("city")

	const selectedCity = citySelect.value
	const departments = cities.find((city) => city.cityName === selectedCity).departments
	if (departments) {
		renderDepartments(departments)
	}
}

function updateEmployees() {
	const departmentSelect = document.getElementById("department")

	const selectedCity = document.getElementById("city").value
	const selectedDept = departmentSelect.value
	const departments = selectedCity 
		? cities.find((city) => city.cityName === selectedCity).departments
		: cities.map(city => city.departments).flat()
	const employees = selectedDept 
		? departments.find((dept) => dept.departmentName === selectedDept).employees
		: departments.map(dept => dept.employees).flat()
	if (departments && employees) {
		renderEmployees(employees)
	}
}

function saveToCookie() {
	const selectedCity = document.getElementById("city").value
	const selectedDepartment = document.getElementById("department").value
	const selectedEmployee = document.getElementById("employee").value
	const selectedBrigade = document.getElementById("brigade").value
	const selectedShift = document.getElementById("shift").value

	const selection = {
		city: selectedCity,
		department: selectedDepartment,
		employee: selectedEmployee,
		brigade: selectedBrigade,
		shift: selectedShift
	}

	const jsonString = JSON.stringify(selection)
	document.cookie = "selectionData=" + jsonString + " path=/ max-age=" + 60*60*24 // cookie на один день
}

citySelect.addEventListener("change", updateDepartments)
departmentSelect.addEventListener("change", updateEmployees)
saveButton.addEventListener("click", saveToCookie)

renderCities(cities)
