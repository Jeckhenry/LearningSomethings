export default store => {
    console.log('初始化vuex');
    if (localStorage) {
        const user = JSON.parse(localStorage.getItem('userinfo'));
        if (user) {
            store.commit('user/login', user.username, true);
        }
    }

    store.subscribe((mutation) => {
        console.log(mutation.type.startsWith('user/'));
        if (mutation.type === 'user/login') {
            localStorage.setItem('userinfo', JSON.stringify({ username: mutation.payload }));
        } else if (mutation.type === 'user/logout') {
            localStorage.removeItem('userinfo');
        }
    })
}