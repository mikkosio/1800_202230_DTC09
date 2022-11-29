let startDate = document.getElementById('startDate')
let endDate = document.getElementById('endDate')


//Bootstrap Calendar event listener
startDate.addEventListener('change', (e) => {
    let startDateVal = e.target.value
    document.getElementById('startDateSelected').innerText = startDateVal
})

endDate.addEventListener('change', (e) => {
    let endDateVal = e.target.value
    document.getElementById('endDateSelected').innerText = endDateVal
})

