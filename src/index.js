import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

//Create a new component which will produce an HTML.
const API_KEY = 'AIzaSyDfdmOaeagu7b9F0rSNtd62wTeMb9zeEaI';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {videos : [],
            selectedVideo : null

        };
        this.videoSearch('surfboards');
    }

    videoSearch(term){
        YTSearch({key: API_KEY ,term: term},(videos) =>{
            this.setState({ videos : videos,
                selectedVideo: videos[0]

            });
        } );
    }

   render() {
        const videoSearch = _.debounce((term) =>{this.videoSearch(term)} , 300);

       return(
       <div>
           <div className="app-div">Youtube feature</div>
           <SearchBar onSearchTermChange={term => this.videoSearch(term)}/>
           <VideoDetail video={this.state.selectedVideo} />
           <VideoList onVideoSelect={selectedVideo => this.setState({selectedVideo})} videos={this.state.videos} />
       </div>
       );
   }
}

//Take component;s generated HTML and put it on page
ReactDOM.render(<App /> , document.querySelector('.container'));