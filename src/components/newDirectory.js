import React, {useState} from 'react';

const Directory = () => {
    const [text, setText] = useState('');

    const printList = () => {
        const commandList = text.split('\n');
        let itemList = [];
        let printCommands = [];
        let indexArray = [];
        for(let x = 0; x < commandList.length; x++) {
            let action = commandList[x].split(' ')[0];
            printCommands = printCommands.concat(commandList[x])

            if (action === 'CREATE') {
                let newItems = commandList[x].split(' ')[1].split('/');

                if(newItems.length === 1) {
                    itemList = itemList.concat(commandList[x].split(' ')[1]);
                } else {
                    let poppedItem = newItems.pop();
                    let index = itemList.indexOf(newItems.join('/'));
                    itemList[index] = commandList[x].split(' ')[1];
                }
            } 
            else if (action === 'MOVE') {
                let index = itemList.indexOf(commandList[x].split(' ')[1]);
                let tempArray = itemList[index].split('/');
                let moveValue = tempArray.pop();

                itemList[index] = tempArray.join('/');


                console.log('MOVE ', moveValue);
                console.log('LIST ', itemList[index])
            }
            else if (action === 'LIST') {
                printCommands = printCommands.concat(itemList)
            }
        }

        return printCommands.map(item => {
            return (
                <div>{item}</div>
            )
        })
    }

    return (
        <div>   
            <textarea 
                type="text" 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
            />
            <div>
                {printList()}
            </div>
        </div>
    )
}

export default Directory;


{ name: []}