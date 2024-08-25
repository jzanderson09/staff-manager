//Generates staff, add member form and anchors to the container:
let staffManager = (function () {
    let staffMembers = [
        {name: 'Jim', age: 35, title: 'Sales'}, 
        {name: 'Pam', age: 32, title: 'Receptionist'},
        {name: 'Dwight', age: 37, title: 'Sales'},
        {name: 'Angela', age: 36, title: 'Accountant'},
        {name: 'Michael', age: 40, title: 'Regional Manager'},
        {name: 'Toby', age: 42, title: 'Human Resources Representative'}];

    function addMember(newMember) {
        const staffNames = [];
        staffMembers.forEach(member => staffNames.push(member.name));
        if (staffNames.includes(newMember.name)) {
            alert(`Error:  ${newMember.name} is already a part of your staff!`);
        } else {
            newMember.name === 'Michael' ? new Audio('./michael_hired.mp3').play() : new Audio('./hired.mp3').play();
            alert(`Let's welcome ${newMember.name} to the office!`);
            staffMembers.push(newMember);
            updateStaff();
        }
    }

    function deleteMember(id) {
        if (confirm(`Are you sure you want to fire ${staffMembers[id].name}?`)) {
            staffMembers[id].name === 'Michael' ? new Audio('./michael_quit.mp3').play() : new Audio('./quit.mp3').play();
            alert(`${staffMembers[id].name} has left the office!`);
            staffMembers.splice(id, 1);
            updateStaff();
        }
    }

    function generateStaff() {
        const staffDiv = document.createElement('div');
        staffDiv.className = 'staff';
        const memberCardBoiler = document.createElement('div');
        memberCardBoiler.className = 'staff-member';
        staffMembers.forEach(member => {
            let workingMemberDiv = memberCardBoiler.cloneNode();
            workingMemberDiv.id = staffMembers.findIndex(staffMember => staffMember.name === member.name);
            let deleteBtn = document.createElement('button');
            deleteBtn.addEventListener('click', () => deleteMember(workingMemberDiv.id));
            deleteBtn.className = 'delete';
            deleteBtn.textContent = 'X';
            let info = document.createElement('p');
            info.className = 'info';
            info.textContent = member.name;
            workingMemberDiv.append(deleteBtn, info);
            staffDiv.appendChild(workingMemberDiv); 
        });
        console.table(staffMembers);
        return staffDiv;
    }

    function generateUserForm() {
        const userForm = document.createElement('div');
        userForm.className = 'user-form';
        const name = document.createElement('input');
        name.autocomplete = 'off';
        name.id = 'name';
        name.placeholder = 'Name';
        const age = document.createElement('input');
        age.autocomplete = 'off';
        age.id = 'age';
        age.placeholder = 'Age';
        const title = document.createElement('input');
        title.autocomplete = 'off';
        title.id = 'title';
        title.placeholder = 'Title';
        const submit = document.createElement('button');
        submit.addEventListener('click', () => {
            addMember({ name: name.value, age: Number(age.value), title: title.value });
            name.value = '';
            age.value = '';
            title.value = '';
        });    
        submit.id = 'submit';
        submit.textContent = 'Add Member';
        userForm.append(name, age, title, submit);

        return userForm;
    }

    function updateStaff() {
        const staffContainer = document.querySelector('.staff');
        const updatedStaff = generateStaff();
        staffContainer.replaceWith(updatedStaff);
    }

    return {
        generateStaff: generateStaff,
        generateUserForm: generateUserForm,
    };
})();

const container = document.querySelector('#container');
container.style.backgroundImage = "url('./office_bg.jpg')";
container.style.backgroundPosition = 'center';
container.style.backgroundSize = 'contain';

container.append(staffManager.generateUserForm(), staffManager.generateStaff());