let orgData = {
    id: 1,
    children: [{
            id: 2,
            children: [
                { id: 4 },
                {
                    id: 5,
                    children: [
                        { id: 9 },
                        { id: 10 }
                    ]
                },
                { id: 6 }
            ]
        },
        {
            id: 3,
            children: [
                { id: 7 },
                { id: 8 }
            ]
        }
    ]
};

function createOrgTree(container, data) {
    const ul = document.createElement('ul');

    for (const item of data) {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.className = 'tf-nc';
        span.textContent = item.id;
        li.appendChild(span);

        if (item.children && item.children.length > 0) {
            const subTree = createOrgTree(li, item.children);
            li.appendChild(subTree);
        }

        ul.appendChild(li);
    }

    return ul;
}

function updateOrgTree() {
    const orgTreeRoot = document.getElementById('orgTreeRoot');
    orgTreeRoot.innerHTML = '';
    orgTreeRoot.appendChild(createOrgTree(orgTreeRoot, [orgData]));
}

function addElement() {
    const id = prompt('Enter the ID of the new element:');
    if (id) {
        const parentId = prompt('Enter the ID of the parent element:');
        if (parentId) {
            const parentElement = findElementById(orgData, Number(parentId));
            if (parentElement) {
                if (!parentElement.children) {
                    parentElement.children = [];
                }

                // Check if ID already exists in the tree
                const existingElement = findElementById(orgData, Number(id));
                if (existingElement) {
                    alert('Element with the same ID already exists.');
                } else {
                    parentElement.children.push({ id: Number(id) });
                    updateOrgTree();
                }
            } else {
                alert('Parent element not found.');
            }
        } else {
            alert('Invalid parent ID.');
        }
    } else {
        alert('Invalid ID.');
    }
}

function deleteElement() {
    const id = prompt('Enter the ID of the element to delete:');
    if (id) {
        if (orgData.id === Number(id)) {
            alert('Cannot delete the root element.');
        } else {
            const parentElement = findParentElement(orgData, Number(id));
            if (parentElement) {
                parentElement.children = parentElement.children.filter(
                    (child) => child.id !== Number(id)
                );
            } else {
                alert('Element not found.');
            }
            updateOrgTree();
        }
    } else {
        alert('Invalid ID.');
    }
}

function findElementById(data, id) {
    if (data.id === id) {
        return data;
    }

    if (data.children) {
        for (const child of data.children) {
            const result = findElementById(child, id);
            if (result) {
                return result;
            }
        }
    }

    return null;
}

function findParentElement(data, id) {
    if (data.children) {
        for (const child of data.children) {
            if (child.id === id) {
                return data;
            }
            const result = findParentElement(child, id);
            if (result) {
                return result;
            }
        }
    }

    return null;
}

const addElementBtn = document.getElementById('addElementBtn');
addElementBtn.addEventListener('click', addElement);

const deleteElementBtn = document.getElementById('deleteElementBtn');
deleteElementBtn.addEventListener('click', deleteElement);

updateOrgTree();