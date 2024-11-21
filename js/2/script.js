const CITIES = [
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

const { createApp, ref, computed } = Vue

createApp({
	setup() {
		const selectedCity = ref("")
		const selectedDepartment = ref("")
		const selectedEmployee = ref("")
		const selectedBrigade = ref("")
		const selectedShift = ref("Дневная")

		const cities = ref(CITIES)
		const departments = computed(() => selectedCity.value 
			? cities.value.find(city => city.cityName === selectedCity.value).departments
			: cities.value.map(city => city.departments).flat()
		)
		const employees = computed(() => selectedDepartment.value
			? departments.value.find(department => department.departmentName === selectedDepartment.value).employees
			: departments.value.map(department => department.employees).flat()
		)

		function saveCookie() {
			const selection = {
				city: selectedCity.value,
				department: selectedDepartment.value,
				employee: selectedEmployee.value,
				brigade: selectedBrigade.value,
				shift: selectedShift.value
			}

			const jsonString = JSON.stringify(selection)
			document.cookie = "selectionData=" + jsonString + " path=/ max-age=" + 60*60*24	
		}

		return {
			selectedCity,
			selectedDepartment,
			selectedEmployee,
			selectedBrigade,
			selectedShift,
			
			cities,
			departments,
			employees,

			saveCookie
		}
	}
}).mount('#app')
