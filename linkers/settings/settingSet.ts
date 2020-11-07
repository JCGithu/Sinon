function settingSet() {
    storage.set('settings', {
        UrlWipe: 'false',
        DarkMode: 'false',
        Geo:'',
        CustomProxy : '',
        InstaUse : '',
        InstaPass : '',
        downloadPath : ''
    }, function(error) {
        if (error) throw error;
    })
    console.log('Setting File Created!')
};

module.exports = {
    settingSet
}