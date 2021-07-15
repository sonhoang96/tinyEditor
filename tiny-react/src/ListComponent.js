import React, { useState, useEffect } from 'react';
import DetailComponent from './DetailComponent';
const ListComponent = (props) => {
    const [data, setData] = useState('');
    const [detailContent, setDetail] = useState(false);
    const [idContent, setIdContent] = useState(null);
    const handleDetail = (id) => {
        setDetail(true);
        setIdContent(id);
    }
    // console.log(detailContent)
    useEffect(async () => {
        const url = `http://localhost:3001/tinyEditor`;
        var getData = [];
        if (props.status) {
            getData = await new Promise((resolve, reject) => {
                fetch(url, { method: "GET" })
                    .then(response => resolve(response.json()))
                    .catch(error => reject(error))
            })
        }
        setData(getData)
    }, [props.status]);
    return (
        <>
            {
                detailContent ?
                    <DetailComponent id = {idContent} handleChangeStatus = {() => setDetail(false)} />
                    :
                    <table>
                        <thead>
                            <tr>
                                <td>STT</td>
                                <td>Nội dung</td>
                                <td>Chức năng</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data && data?.content.map((item, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{key + 1}</td>
                                            <td>{item.content}</td>
                                            <td>
                                                <button onClick={() => handleDetail(item._id)}>Detail</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
            }
        </>
    );
}

export default ListComponent;
