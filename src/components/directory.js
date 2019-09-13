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
                let moveValue = commandList[x].split(' ')[1].split('/').pop();
                let newParent = commandList[x].split(' ')[2]

                let joinStr = itemList.join('$');
                let index = joinStr.indexOf(moveValue);

                let tempStr = joinStr.slice(index);
                let endOfStr = tempStr.lastIndexOf('$');

                tempStr = endOfStr === -1 ? tempStr : tempStr.slice(0, endOfStr-1);

                console.log('Move ITem ', moveValue);
                console.log('Parent ', newParent);
                console.log("Sring ", joinStr)
                console.log('MOVING ', tempStr)

            }
            else if (action === 'DELETE') {
                let index = itemList.indexOf(commandList[x].split(' ')[1]);

                if(index === -1) {
                    let nonExist = commandList[x].split(' ')[1].split('/')[0]

                    let str = `Cannot delete ${commandList[x].split(' ')[1]} - ${nonExist} does not exist`
                    printCommands = printCommands.concat(str)
                } else {
                    let arr = commandList[x].split(' ')[1].split('/')
                    arr.pop();
                    itemList[index] = arr.join('/');
                }
            }
            else if (action === 'LIST') {
                console.log(itemList)
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
            <h4 style={{textAlign: 'center'}}>PASTE COMMANDS IN TEXT AREA</h4>
            <div style={ {display: 'flex', justifyContent: 'space-around'}}>   
                <textarea 
                    style={{height: '400px', width: '300px'}}
                    type="text" 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                />
                <div>
                    {printList()}
                </div>
            </div>
        </div>
    )
}

export default Directory;