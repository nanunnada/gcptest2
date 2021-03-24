// 데이터 수집 모듈

// update
async function upfu(id, newtext){
    try{    
        const res = await axios.get(`/users/${id}`);
        const comments = res.data;
        try{
            await axios.patch(`/users/${id}`, {text: newtext}); 
            //getUser(id);
        }catch(err){
            console.error(err);
        }          
    }catch(err){
        console.error(err);
    }
}
// delete
async function defu(id){
    try{
        const res = await axios.get(`/users/${id}`);
        const comments = res.data;
        try{
            await axios.delete(`/users/${id}`); 
            //getUser(id);
        }catch(err){
            console.error(err);
        }
    }catch(err){
    console.error(err);
}
}

// 사용자 정보 로딩, 가져온 정보를 기능을 더해 테이블에 추가하고 출력
async function getUser(id){
    try{
        const res = await axios.get(`/users/${id}`);
        const users = res.data;
        console.log(users);
        const tbody = document.querySelector('#user_info tbody');
        tbody.innerHTML='';
        users.map(function(user){
            const row = document.createElement('tr');
            let td = document.createElement('td');
            td.textContent = user.name;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = user.text;
            row.appendChild(td);

            const edit = document.createElement('button');
            edit.textContent = '수정';
            edit.addEventListener('click', async () => {
                const newtext = prompt('바꿀 내용을 입력하세요');
                if(!newtext){
                    return alert('내용을 입력하세요!');
                }
                try{
                    upfu(user.id, newtext);
                }catch(err){
                    console.error(err);
                }
            });
            const remove = document.createElement('button');
            remove.textContent = '삭제';
            remove.addEventListener('click', async () => {
                try{
                    defu(user.id);
                }catch(err){
                    console.error(err);
                }
            });
            td = document.createElement('td');
            td.appendChild(edit);
            row.appendChild(td);
            td = document.createElement('td');
            td.appendChild(remove);
            row.appendChild(td);
            tbody.appendChild(row);
        });
    }catch(err){
        console.error(err);
    }
}

// update, delete 후 데이터 갱신을 위한 버튼
document.getElementById('user_reload').addEventListener('submit', async(e) => {
    e.preventDefault();
    const id = e.target.id.value;
    getUser(id);
});

// 사용자(name) 및 text 등록
document.getElementById('user_text').addEventListener('submit', async(e) => {
    e.preventDefault();
    const id = e.target.id.value;
    const name = e.target.name.value;
    const text = e.target.textarea.value;
    if(!name){
        return alert("이름을 입력하세요");
    }
    if(!text){
        return alert("내용을 입력하세요");
    }
    try{
        await axios.post('/users', {id, name, text});
        getUser(id);
    }catch(err){
        console.error(err);
    }
    e.target.id.value='';
    e.target.name.value ='';
    e.target.textarea.value ='';
});