import React, {useEffect, useState } from 'react';
import { getValueFromDb } from '../db/dbConnection';
import { IDBModel } from '../db/dbInterface';

const MainComponent: React.FunctionComponent = function () {
    const searchRef = React.useRef<HTMLInputElement>(null);
    const [list, setQList] = useState<IDBModel[] | []>([]);
    const [filteredList, updateFilteredList] = useState<IDBModel[] | []>([]);

    useEffect(function () {
        const dataReq = getValueFromDb();  // make your request
        dataReq.then(val => setQList(val));
    }, []);

    const filterLabels = (event:any)=>{
        if(event.target){
            const searchText = event.target.value;
            updateFilteredList(
                list.filter(quest=>{
                    return quest.labels.includes(searchText);
                })
            )
        }
    }

    const listToLoop = filteredList.length ? filteredList : list;
    return (<>
        <section style={{ padding: '20px', margin: '20px' }}>
            <input ref={searchRef} placeholder='Search keywords' id='search' name='search' style={{height: '25px',width: '300px'}} onChange={filterLabels}/>
        </section>
        <table>
            <thead>
                <tr>
                    <th>Qid</th><th>QNAme</th><th>Description</th><th>Difficulty Level</th>
                    <th>Labels</th>
                    <th>Link</th>
                </tr>
            </thead>
            <tbody>
                {
                    listToLoop.map((ques: IDBModel) => {
                        return <tr key={`ques-${ques.qId}`}>
                            <td>{ques.qId}</td>
                            <td>{ques.qName}</td>
                            <td>
                                <pre>{ques.description}
                                <p className='detailed'>{ques.detailed_desc}</p></pre>
                            </td>
                            <td>{ques.level_of_difficulty}</td>
                            <td>{ques.labels.toString()}</td>
                            <td>{ques.gist_link}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </>)
}


export default MainComponent;