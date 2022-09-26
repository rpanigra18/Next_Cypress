function home({ users }) {

    if (typeof (users) == 'string') {
        return (
            <>
                <h2>{users}</h2>
            </>
        )
    }
    else return (
        <>
            {
                users["user"].map(user => {
                    return (
                        <h2 data-cy='sel' key={user.id}>
                            {user.id} {user.name}
                        </h2>
                    )
                })
            }
            )
        </>

    )
}

export async function getServerSideProps() {
    const response = await fetch('https://icanhazdadjoke.com/', {
        headers: {
            "Accept": "application/json"
        },
    })
    const data = await response.json()
    console.log('My iusers ' + JSON.stringify(data))
    if (data.joke) {
        return {
            props: {
                users: data.joke
            }
        }
    }
    return {
        props: {
            users: data
        }
    }
}


export default home