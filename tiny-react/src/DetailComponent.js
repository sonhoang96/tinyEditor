import React, { useState, useEffect } from 'react';
import marked from "marked"
function DetailComponent(props) {
    const [data, setData] = useState({});
    const htmlSource = (data) => {
        return marked(data)
    }
    const preview = (value) => {
        return { __html: marked(value) }
    }
    useEffect(async () => {
        const url = `http://localhost:3001/tinyEditor/${props.id}`;
        var getData = [];
        if (props.id) {
            getData = await new Promise((resolve, reject) => {
                fetch(url, { method: "GET" })
                    .then(response => resolve(response.json()))
                    .catch(error => reject(error))
            })
        }
        setData(getData);
    }, [props.id]);
    // console.log(content)
    return (
        <div>
            {
                data.content &&
                <>
                    <textarea id="right-area" cols="60" rows="20" value={htmlSource(data.content.content)} readOnly></textarea>
                    <div dangerouslySetInnerHTML={preview(data.content.content)} className='innerText' />
                </>
            }
            <button onClick={() => props.handleChangeStatus()}>Back</button>
        </div>
    );
}

export default DetailComponent;