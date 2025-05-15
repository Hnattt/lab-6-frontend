class Equipment {
    id = null;
    name = null;
    manufacturer = null;
    inventoryNumber = null;
    startDate = null;
    lifespan = null;

    constructor(dataObj) {
        this.id = dataObj.id;
        this.name = dataObj.name;
        this.manufacturer = dataObj.manufacturer;
        this.inventoryNumber = dataObj.inventoryNumber;
        this.startDate = dataObj.startDate;
        this.lifespan = dataObj.lifespan;
    }

    displayAsTableRow() {
        return `
            <tr>
                <td>${this.name}</td>
                <td>${this.manufacturer}</td>
                <td>${this.inventoryNumber}</td>
                <td>${this.lifespan}</td>
                <td>${this.startDate}</td>
                <td>
                    <button data-id="${this.id}" class="edit-equipment btn btn-warning">Редагувати</button>
                    <button data-id="${this.id}" class="delete-equipment btn btn-danger">Видалити</button>
                </td>
            </tr>
        `;
    }

    displayAsOption() {
        return `<option value="${this.name}">${this.name}</option>`;
    }

    edit(dataObj) {
        this.name = dataObj.name;
        this.manufacturer = dataObj.manufacturer;
        this.inventoryNumber = dataObj.inventoryNumber;
        this.startDate = dataObj.startDate;
        this.lifespan = dataObj.lifespan;
    }
}

class Specification {
    id = null;
    quantity = null;
    name = null;
    productionTime = null;

    constructor(dataObj) {
        this.id = dataObj.id;
        this.quantity = dataObj.quantity;
        this.name = dataObj.name;
        this.productionTime = dataObj.productionTime;
    }

    displayAsTableRow() {
        return `
            <tr>
                <td>${this.quantity}</td>
                <td>${this.name}</td>
                <td>${this.productionTime}</td>
                <td>
                    <button data-id="${this.id}" class="edit-specification btn btn-warning">Редагувати</button>
                    <button data-id="${this.id}" class="delete-specification btn btn-danger">Видалити</button>
                </td>
            </tr>
        `;
    }

    displayAsOption() {
        return `<option value="${this.name}">${this.name}</option>`;
    }

    edit(dataObj) {
        this.quantity = dataObj.quantity;
        this.name = dataObj.name;
        this.productionTime = dataObj.productionTime;
    }
}

class Material {
    id = null;
    name = null;
    type = null;
    pricePerUnit = null;
    unitOfMeasure = null;
    alternative = null;

    constructor(dataObj) {
        this.id = dataObj.id;
        this.name = dataObj.name;
        this.type = dataObj.type;
        this.pricePerUnit = dataObj.pricePerUnit;
        this.unitOfMeasure = dataObj.unitOfMeasure;
        this.alternative = dataObj.alternative;
    }

    displayAsTableRow() {
        return `
            <tr>
                <td>${this.name}</td>
                <td>${this.type}</td>
                <td>${this.pricePerUnit}</td>
                <td>${this.unitOfMeasure}</td>
                <td>${this.alternative}</td>
                <td>
                    <button data-id="${this.id}" class="edit-material btn btn-warning">Редагувати</button>
                    <button data-id="${this.id}" class="delete-material btn btn-danger">Видалити</button>
                </td>
            </tr>
        `;
    }

    displayAsOption() {
        return `<option value="${this.name}">${this.name}</option>`;
    }

    edit(dataObj) {
        this.name = dataObj.name;
        this.type = dataObj.type;
        this.pricePerUnit = dataObj.pricePerUnit;
        this.unitOfMeasure = dataObj.unitOfMeasure;
        this.alternative = dataObj.alternative;
    }
}

class BaseList {
    constructor() {
        this.list = [];
    }

    edit(dataObj) {
        for (let i = 0; i < this.list.length; i++) {
            if (dataObj.id == this.list[i].id) {
                this.list[i].edit(dataObj);
                break;
            }
        }
    }

    delete(id) {
        for (let i = 0; i < this.list.length; i++) {
            if (id == this.list[i].id) {
                this.list.splice(i, 1);
                break;
            }
        }
    }

    displayTableRows() {
        let content = ``;
        for (let i = 0; i < this.list.length; i++) {
            content += this.list[i].displayAsTableRow();
        }
        return content;
    }

    displaySelectOptions() {
        let content = ``;
        for (let i = 0; i < this.list.length; i++) {
            content += this.list[i].displayAsOption();
        }
        return content;
    }

    getById(id) {
        for (let i = 0; i < this.list.length; i++) {
            if (id == this.list[i].id) {
                return this.list[i];
            }
        }
    }
}

class EquipmentList extends BaseList {
    add(dataObj) {
        let equipment = new Equipment(dataObj);
        this.list.push(equipment);
    }
}

class SpecificationList extends BaseList {
    add(dataObj) {
        dataObj.id = this.id++;
        let specification = new Specification(dataObj);
        this.list.push(specification);
    }
}

class MaterialList extends BaseList {
    add(dataObj) {
        let material = new Material(dataObj);
        this.list.push(material);
    }
}

let equipments = new EquipmentList();
fetch('https://6824d1790f0188d7e72af287.mockapi.io/equipment')
  .then(response => response.json())
  .then(data => {
    for(let i=0; i<data.length; i++){
        equipments.add(data[i]);
    }
    displayEquipments();
  });

let specifications = new SpecificationList();

let materials = new MaterialList();
fetch('https://6824d1790f0188d7e72af287.mockapi.io/materials')
  .then(response => response.json())
  .then(data => {
    for(let i=0; i<data.length; i++){
        materials.add(data[i]);
    }
    displayMaterials();
  });

function displayEquipments() {
    const equipmentTab = document.getElementById('equipment');
    const equipmentSelect = document.getElementById('specificationEquipmentInput');
    let equipmentSelectContent = ``;
    let equipmentTabContent = `
        <h3>Обладнання</h3>
        <button id="addEquipment" class="btn btn-success" data-toggle="modal" data-target="#equipmentModal">Додати</button>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Назва</th>
                    <th>Виробник</th>
                    <th>Інвентарний номер</th>
                    <th>Термін експлуатації</th>
                    <th>Початок експлуатації</th>
                    <th>Дії</th>
                </tr>
            </thead>
            <tbody>
        `;
    if (equipmentSelect) {
        equipmentSelectContent += equipments.displaySelectOptions();
        equipmentSelect.innerHTML = equipmentSelectContent;
    }
    equipmentTabContent += equipments.displayTableRows();
    equipmentTabContent += `</tbody>
        </table>`;
    equipmentTab.innerHTML = equipmentTabContent;
}

function displaySpecifications() {
    const specificationTab = document.getElementById('specification');
    let specificationTabContent = `
        <h3>Специфікація виробу</h3>
        <button id="addSpecification" class="btn btn-success" data-toggle="modal" data-target="#specificationModal">Додати</button>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Кількість</th>
                    <th>Назва</th>
                    <th>Тривалість виробництва</th>
                    <th>Дії</th>
                </tr>
            </thead>
            <tbody>
        `;
    specificationTabContent += specifications.displayTableRows();
    specificationTabContent += `</tbody>
        </table>`;
    specificationTab.innerHTML = specificationTabContent;
}

function displayMaterials() {
    const materialTab = document.getElementById('material');
    const materialSelect = document.getElementById('specificationMaterialInput');
    let materialSelectContent = ``;
    let materialTabContent = `
        <h3>Матеріал</h3>
        <button id="addMaterial" class="btn btn-success" data-toggle="modal" data-target="#materialModal">Додати</button>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Назва</th>
                    <th>Тип</th>
                    <th>Ціна за одиницю</th>
                    <th>Одиниця вимірювання</th>
                    <th>Альтернатива</th>
                    <th>Дії</th>
                </tr>
            </thead>
            <tbody>
        `;
    if (materialSelect) {
        materialSelectContent += materials.displaySelectOptions();
        materialSelect.innerHTML = materialSelectContent;
    }
    materialTabContent += materials.displayTableRows();
    materialTabContent += `</tbody>
        </table>`;
    materialTab.innerHTML = materialTabContent;
}

displaySpecifications();

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-equipment')) {
        e.preventDefault();
        let elementId = e.target.getAttribute('data-id');
        equipments.delete(elementId);
        fetch('https://6824d1790f0188d7e72af287.mockapi.io/equipment/'+elementId, {
            method: "DELETE",
        })
        .then(response => response.json())
        .then(data => {
            displayEquipments();
        });
    } else if (e.target.classList.contains('delete-specification')) {
        e.preventDefault();
        let elementId = e.target.getAttribute('data-id');
        specifications.delete(elementId);
        displaySpecifications();
    } else if (e.target.classList.contains('delete-material')) {
        e.preventDefault();
        let elementId = e.target.getAttribute('data-id');
        materials.delete(elementId);
        fetch('https://6824d1790f0188d7e72af287.mockapi.io/materials/'+elementId, {
            method: "DELETE",
        })
        .then(response => response.json())
        .then(data => {
            displayMaterials();
        });
    } else if (e.target.classList.contains('edit-equipment')) {
        e.preventDefault();
        let elementId = e.target.getAttribute('data-id');
        let equipment = equipments.getById(elementId);
        document.getElementById('equipmentIdInput').value = equipment.id;
        document.getElementById('equipmentNameInput').value = equipment.name;
        document.getElementById('equipmentManufacturerInput').value = equipment.manufacturer;
        document.getElementById('equipmentInventoryNumberInput').value = equipment.inventoryNumber;
        document.getElementById('equipmentStartDateInput').value = equipment.startDate;
        document.getElementById('equipmentLifespanInput').value = equipment.lifespan;
        document.getElementById('addEquipment').click();
    } else if (e.target.classList.contains('edit-specification')) {
        e.preventDefault();
        let elementId = e.target.getAttribute('data-id');
        let specification = specifications.getById(elementId);
        document.getElementById('specificationIdInput').value = specification.id;
        document.getElementById('specificationQuantityInput').value = specification.quantity;
        document.getElementById('specificationNameInput').value = specification.name;
        document.getElementById('specificationProductionTimeInput').value = specification.productionTime;
        document.getElementById('addSpecification').click();
    } else if (e.target.classList.contains('edit-material')) {
        e.preventDefault();
        let elementId = e.target.getAttribute('data-id');
        let material = materials.getById(elementId);
        document.getElementById('materialIdInput').value = material.id;
        document.getElementById('materialNameInput').value = material.name;
        document.getElementById('materialTypeInput').value = material.type;
        document.getElementById('materialPricePerUnitInput').value = material.pricePerUnit;
        document.getElementById('materialUnitOfMeasureInput').value = material.unitOfMeasure;
        document.getElementById('materialAlternativeInput').value = material.alternative;
        document.getElementById('addMaterial').click();
    }
});

document.addEventListener('submit', function(e) {
    if (e.target.id == "equipmentForm") {
        e.preventDefault();
        let id = document.getElementById('equipmentIdInput').value;
        let name = document.getElementById('equipmentNameInput').value;
        let manufacturer = document.getElementById('equipmentManufacturerInput').value;
        let inventoryNumber = document.getElementById('equipmentInventoryNumberInput').value;
        let startDate = document.getElementById('equipmentStartDateInput').value;
        let lifespan = document.getElementById('equipmentLifespanInput').value;
        
        let newEquipment = {
            id: id,
            name: name,
            manufacturer: manufacturer,
            inventoryNumber: inventoryNumber,
            startDate: startDate,
            lifespan: lifespan
        };
        
        if (id == "") {
            fetch('https://6824d1790f0188d7e72af287.mockapi.io/equipment', {
                method: "POST",
                body: JSON.stringify(newEquipment),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                equipments.add(data);
                displayEquipments();
            });
        } else {
            fetch('https://6824d1790f0188d7e72af287.mockapi.io/equipment/'+id, {
                method: "PUT",
                body: JSON.stringify(newEquipment),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                equipments.edit(data);
                displayEquipments();
            });
        }
        
        document.getElementById('equipmentIdInput').value = "";
        document.getElementById('equipmentForm').reset();
        document.getElementById('closeEquipmentModal').click();
        
    } else if (e.target.id == "specificationForm") {
        e.preventDefault();
        let id = document.getElementById('specificationIdInput').value;
        let quantity = document.getElementById('specificationQuantityInput').value;
        let name = document.getElementById('specificationNameInput').value;
        let productionTime = document.getElementById('specificationProductionTimeInput').value;
        
        let newSpecification = {
            id: id,
            quantity: quantity,
            name: name,
            productionTime: productionTime
        };
        
        if (id == "") {
            specifications.add(newSpecification);
        } else {
            specifications.edit(newSpecification);
        }
        
        displaySpecifications();
        document.getElementById('specificationIdInput').value = "";
        document.getElementById('specificationForm').reset();
        document.getElementById('closeSpecificationModal').click();
        
    } else if (e.target.id == "materialForm") {
        e.preventDefault();
        let id = document.getElementById('materialIdInput').value;
        let name = document.getElementById('materialNameInput').value;
        let type = document.getElementById('materialTypeInput').value;
        let pricePerUnit = document.getElementById('materialPricePerUnitInput').value;
        let unitOfMeasure = document.getElementById('materialUnitOfMeasureInput').value;
        let alternative = document.getElementById('materialAlternativeInput').value;
        
        let newMaterial = {
            id: id,
            name: name,
            type: type,
            pricePerUnit: pricePerUnit,
            unitOfMeasure: unitOfMeasure,
            alternative: alternative
        };
        
        if (id == "") {
            fetch('https://6824d1790f0188d7e72af287.mockapi.io/materials', {
                method: "POST",
                body: JSON.stringify(newMaterial),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                materials.add(data);
                displayMaterials();
            });
        } else {
            fetch('https://6824d1790f0188d7e72af287.mockapi.io/materials/'+id, {
                method: "PUT",
                body: JSON.stringify(newMaterial),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                materials.edit(data);
                displayMaterials();
            });
        }
        document.getElementById('materialIdInput').value = "";
        document.getElementById('materialForm').reset();
        document.getElementById('closeMaterialModal').click();
    }
});
