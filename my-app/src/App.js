import React, { Component } from 'react';
import './App.css';
// importing Projects from component folder
import Projects from './Components/Projects';
import AddProject from './Components/AddProject';
//added npm package to create unique identitfier
import uuid from 'uuid';
// create a constructor to add state

/*

  ** You want top of your applications in state
  and then pass it down through other components
  through properties

  Data should be immutable 
  **SHOULD GO FROM TOP DOWN

  ** EACH COMPONENT HAS THEIR OWN STATE

        SUMMARY
        1.) Setting our state in our main app component (Projects)
        2.) mapping it into projects as a property
        3.) inside projects were mapping through our array
        4.) outputting a project output component where
            each project outputs the title and the category


*/

//================================================================================================

class App extends Component {
  constructor(){
    // this is where you would define state keys
    // when you put a constructor you need to call super
    super();
    this.state = {
      //set projects into state
      projects: []
    }
  }

  //lifecycle method fires every time componenet is rerendered
  /* THIS IS WHERE YOU WOULD PUT YOUR AJAX CALLS (In the life cycle method) */
  // there is also componentDidMount (There are more lifecycle methods in the documentation)
  componentWillMount(){
    this.setState({projects: [
      {
        id: uuid.v4(),
        title: 'Business Website',
        category: 'Web Design'
      },
      {
        id: uuid.v4(),
        title : 'Social App',
        category: 'Mobile Development'
      },
      {
        id: uuid.v4(),
        title: 'Ecommerce Shopping Cart',
        category: 'Web Development'
      }
    ]});
  }

  // creating a function for handling the new project that gets created in add project
  handleAddProject(project){
    // React state immutible it means you dont want to change it you want to UPDATE IT
    // get everything thats in it push to it and set it again

    let projects = this.state.projects;
    projects.push(project);
    this.setState({projects:projects});

    //console.log(project);
  }

  handleDeleteProject(id){
    let projects = this.state.projects;
    // search through the project indexes
    let index = projects.findIndex(x => x.id === id);
    projects.splice(index,1)
    //reset the state like above
    this.setState({projects:projects});
  }

  render() {
    return (
      // can only have one main div on the top level
      // calling projects component
      // mapping projects as a property <Projects projects ={} />
      <div className="App">
        <AddProject addProject={this.handleAddProject.bind(this)}/>
        
        <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)}/>
      </div>
    );
  }
}

export default App;
