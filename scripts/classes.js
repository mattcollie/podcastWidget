var PodcastControl = function(url) {
    var _url = url,
        videoData,
        shouldShowLoader,
        _control = { 
            container:createContainer() 
        };
    
    loadData(function(result){ 
        videoData = result;
        loadControls();
    });

    return _control.container;

    function getDescriptionAndSpeaker(episode) {
        var description = episode.substring(0, episode.indexOf('Speaker:'));
        var speaker = episode.substring(episode.indexOf('Speaker:'));
        return {description:description, speaker:speaker};
    }

    function createContainer() {
        var container = document.createElement("div");
        return container;
    }

    function createTable() {
        var table = document.createElement("table");
        return table;
    }

    function createTR() {
        var tr = document.createElement('tr');
        return tr;
    }

    function createTD() {
        var td = document.createElement('td');
        return td;
    }

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
        var container = createContainer();
        var listul = document.createElement('ul');
        for(var key in videoData.episodes) {
            var listli = createListLIControl(videoData.episodes[key]);
            listul.appendChild(listli);
        }
        
        container.appendChild(listul);
        container.style.maxHeight = '450px';
        container.style.overflow = 'auto';
        return container;
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
        var a = document.createElement('a')
        a.setAttribute('href', '#');
        a.appendChild(createEpisodeContainer(audioData));
        listli.appendChild(a);
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

    function createEpisodeContainer(episode) {
        var container = createContainer();
        var table = createTable();
        var row = createTR();
        var tdImage = createTD();
        var imgContainer = createImageContainer(episode);
        var tdContent = createTD();
        var contentContainer = createContentContainer(episode);
        tdImage.appendChild(imgContainer);
        tdContent.appendChild(contentContainer);
        row.appendChild(tdImage);
        row.appendChild(tdContent);
        table.appendChild(row);
        container.appendChild(table);
        container.style.backgroundColor = 'rgb(50,50,50)';
        container.style.position = 'relative';
        container.style.borderRadius = '2px';
        return container;
    }

    function createImageContainer(episode) {
        var imgContainer = createContainer();
        var img = document.createElement('img');
        img.src = episode.image;
        img.style.zIndex = '1';
        img.style.display = 'block';
        img.style.maxWidth = '128px';
        img.style.maxHeight = '64px';
        img.style.width = 'auto';
        img.style.height = 'auto';
        img.style.margin = 'auto';
        var timeCounter = createContainer();
        timeCounter.textContent = episode.duration;
        timeCounter.style.position = 'absolute';
        timeCounter.style.top = '0px';
        timeCounter.style.right = '0px';
        timeCounter.style.zIndex = '100';
        timeCounter.style.padding = '2px';
        timeCounter.style.backgroundColor = 'rgba(0,0,0, 0.6)';
        timeCounter.style.color = 'white';
        timeCounter.style.borderRadius = '2px';
        timeCounter.style.fontSize = '12';
        imgContainer.appendChild(img);
        imgContainer.appendChild(timeCounter);
        imgContainer.style.width = '64';
        imgContainer.style.height = '64';
        imgContainer.style.overflow = 'hidden';
        imgContainer.style.display = 'inline-block';
        imgContainer.style.position = 'relative';
        imgContainer.style.margin = 'auto';
        return imgContainer;
    }

    function createContentContainer(episode) {
        var container = createContainer();
        var titleContainer = createContainer();
        titleContainer.textContent = episode.title;
        titleContainer.style.top = '0';
        titleContainer.style.fontSize = '18px';
        titleContainer.style.fontWeight = 'bold';
        titleContainer.style.color = 'rgb(200,200,200)';
        var info = getDescriptionAndSpeaker(episode.description);
        var descriptionSpeakerContainer = createContainer();
        var descriptionContainer = createContainer();
        descriptionContainer.textContent = info.description;
        descriptionContainer.style.color = 'rgb(200,200,200)';
        var speakerContainer = createContainer();
        speakerContainer.textContent = info.speaker;
        speakerContainer.style.fontSize = '12px';
        speakerContainer.style.position = 'absolute';
        speakerContainer.style.bottom = '0px';
        speakerContainer.style.left = '0px';
        speakerContainer.style.color = 'rgb(200,200,200)';
        descriptionSpeakerContainer.style.position = 'relative';
        descriptionSpeakerContainer.style.minHeight = '50px';
        descriptionSpeakerContainer.appendChild(descriptionContainer);
        descriptionSpeakerContainer.appendChild(speakerContainer);
        container.appendChild(titleContainer);
        container.appendChild(descriptionSpeakerContainer);
        container.style.display = 'inline-block';
        container.style.top = '0px';
        container.style.position = 'absolute';
        return container;
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
        $.getJSON(_url, callback);
    }

    function loadControls() { 
        console.log(videoData);
        _control.title = createTitle();
        var audioContainer = createAudioContainer();
        _control.audioContainer = audioContainer.audioContainer;
        _control.audioSource = audioContainer.audioSource;
        _control.list = createListULControl();
        _control.loader = createLoadingShow();
        _control.container.appendChild(_control.title);
        _control.container.appendChild(_control.audioContainer);
        _control.container.appendChild(_control.loader);
        _control.container.appendChild(_control.list);
        _control.container.style.backgroundColor = 'rgb(25,25,25)';
        _control.container.style.maxHeight = '500px';
        _control.container.style.overflow = 'hidden';
    }
}