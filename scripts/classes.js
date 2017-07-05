var PodcastControl = function(div) {
    var URL = 'https://feed.podcastmachine.com/podcasts/21337.json',
        videoData,
        shouldShowLoader,
        _control = { };
    
    loadData(function(result){ 
        videoData = result;
        loadControls();
    });

    function createTitle() {
        var titleDiv = document.createElement("div"); 
        titleDiv.textContent = videoData.name + ' :: Podcasts';
        return titleDiv;
    }

    function createAudioContainer() {
        var audioContainer = document.createElement('audio');
        audioContainer.setAttribute('controls', '');
        audioContainer.setAttribute('preload', '');
        audioContainer.addEventListener('loadstart', function() {
            if(!shouldShowLoader)return;
            console.log('LOADING...');
            showLoader();
        });
        audioContainer.addEventListener('loadeddata', function() {
            console.log('LOADED...');
            hideLoader();
        });
        var audioSource = document.createElement('source');
        audioSource.setAttribute('src', '');
        audioContainer.appendChild(audioSource);
        return {
            audioContainer:audioContainer,
            audioSource:audioSource
        };
    }

    function createListULControl() {
        var listul = document.createElement('ul');
        for(var key in videoData.episodes) {
            var listli = createListLIControl(videoData.episodes[key]);
            listul.appendChild(listli);
        }
        
        return listul;
    }

    function createListLIControl(audioData) {
        var listli = document.createElement('li');
        listli.addEventListener('click', (function(data){
            return function() {
                shouldShowLoader = true;
                console.log(data);
                _control.audioSource.src = data.file;
                _control.audioContainer.load();
                _control.audioContainer.play();
            }
        })(audioData));
        listli.textContent = audioData.title;
        return listli;
    }

    function createLoadingShow() {
        var loader = document.createElement('div');
        loader.style.border = '16px solid #f3f3f3';
        loader.style['border-top'] = '16px solid #3498db';
        loader.style['border-radius'] = '50%';
        loader.style.width = '120px';
        loader.style.height = '120px';
        loader.style.animation = 'spin 2s linear infinite';
        loader.style.display = 'none';
        loader.style.position = 'absolute';
        return loader;
    }

    function showLoader() {
        _control.loader.style.display = 'block';
        _control.list.style.display = 'none';
    }

    function hideLoader() {
        _control.loader.style.display = 'none';
        _control.list.style.display = 'block';
    }

    function loadData(callback) {
        $.getJSON(URL, callback);
    }

    function loadControls() { 
        console.log(videoData);
        _control.title = createTitle();
        var audioContainer = createAudioContainer();
        _control.audioContainer = audioContainer.audioContainer;
        _control.audioSource = audioContainer.audioSource;
        _control.list = createListULControl();
        _control.loader = createLoadingShow();
        div.appendChild(_control.title);
        div.appendChild(_control.audioContainer);
        div.appendChild(_control.loader);
        div.appendChild(_control.list);
    }
}