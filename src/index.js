document.addEventListener('DOMContentLoaded', () => {
  loadDogs();
  function loadDogs() {
    fetch('http://localhost:3000/dogs', {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          const dogTable = document.createElement('tr');
          dogTable.id = `${data[i].name}`;

          const dogName = document.createElement('td');
          dogName.innerText = data[i].name;
          dogName.id = i + 1;
          dogTable.appendChild(dogName);

          const dogBreed = document.createElement('td');
          dogBreed.innerText = data[i].breed;
          dogTable.appendChild(dogBreed);

          const dogSex = document.createElement('td');
          dogSex.innerText = data[i].sex;
          dogTable.appendChild(dogSex);

          const dogEdit = document.createElement('td');
          const editButton = document.createElement('button');
          editButton.innerText = 'Edit';
          editButton.onclick = fillForm;
          dogEdit.appendChild(editButton);
          dogTable.appendChild(dogEdit);

          document.getElementById('table-body').appendChild(dogTable);

          function fillForm() {
            const formName = document.getElementById('dog-name');
            formName.value = data[i].name;
            const formBreed = document.getElementById('dog-breed');
            formBreed.value = data[i].breed;
            const formSex = document.getElementById('dog-sex');
            formSex.value = data[i].sex;
          }
        }
      });
  }
  document.getElementById('dog-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formName = document.getElementById('dog-name');
    const formBreed = document.getElementById('dog-breed');
    const formSex = document.getElementById('dog-sex');

    const dogRow = document.getElementById(formName.value);
    const dogId = dogRow.cells[0].id;
    fetch(`http://localhost:3000/dogs/${dogId}`, {
      method: 'PATCH',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formName.value,
        breed: formBreed.value,
        sex: formSex.value,
      }),
    }).then(() => {
      document.getElementById('table-body').remove();
      const tableBody = document.createElement('tbody');
      tableBody.id = 'table-body';
      document.querySelector('table').appendChild(tableBody);
      loadDogs();
    });
  });
});
