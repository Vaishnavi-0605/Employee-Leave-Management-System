const appr = document.querySelectorAll('.approve-btn');
appr.forEach((appr)=>
{
    appr.addEventListener('click', ()=>
    {
        alert('Leave approved!');
    })
})

const rejected = document.querySelectorAll('.reject-btn');
rejected.forEach((rejected)=>
{
    rejected.addEventListener('click', ()=>
    {
        alert('Leave Rejected!');
    })
})