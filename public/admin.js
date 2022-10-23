
// Your Code Here
async function main() {
    let response = await fetch("http://localhost:3001/listBooks");
    let books = await response.json();
    for(let i = 0; i< books.length; i++) {
        adminListBooks(books[i]);
    }
}

function adminListBooks(book) {
    console.log('Listing books...');
    let rootDiv = document.getElementById('root');
    let newDiv = document.createElement('div');
    newDiv.display = 'flex';
    let newTextbox = document.createElement('input');
    newTextbox.value = book.quantity;
    newTextbox.id = 'book' + book.id;
    let newLabel = document.createElement('label');
    newLabel.textContent = book.title;
    newLabel.htmlFor = 'book' + book.id;
    let newButton = document.createElement('button');
    newButton.textContent = 'Save'
    newButton.id = 'button' + book.id;
    newButton.addEventListener('click', (e) => {
        SaveBookQty(book, newTextbox.value);
    })
    newDiv.append(newLabel);
    newDiv.append(newTextbox);
    newDiv.append(newButton);
    rootDiv.append(newDiv);
}

async function SaveBookQty(book, newQty) {
    let response = await fetch('http://localhost:3001/updateBook', {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            id: book.id,
            quantity: newQty
        })

    })
}

main();