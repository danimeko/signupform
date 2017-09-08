
import React  from 'react';


class App extends React.Component{
  constructor(props) {
    super(props);
  
   this.handleChange  = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      id: '',
                        name: '',
                        email: '',
                        phone: '',
      participants : [
            {   id: '1',
            name: 'Jani', 
            email: 'dani@hotmail.com',
            phone: '0443322118'
          },
          {   id: '2',
            name: 'Dani', 
            email: 'ni@hotmail.com',
            phone: '0443322118'
          },
          {   id: '3',
            name: 'Dolcha', 
            email: 'ani@hotmail.com',
            phone: '0443322118'
          },
          {   id: '4',
            name: 'Cani', 
            email: 'rdani@hotmail.com',
            phone: '0443322118'
          } 
        ]};

    
  }


  handleChange(event){
    const target = event.target;
    const name = target.name;

    this.setState({
      [name] : target.value
    });
  }

  
  handleSubmit(event){
    const newEmp = {  
              id : this.state.id,
              name : this.state.name,
              email : this.state.email,
              phone : this.state.phone 
            };
 

    var part = this.state.participants;
    newEmp.id = new Date().valueOf();
    part.push(newEmp);

    this.setState({participants : part});



    event.preventDefault();
    
  }

  render() {

              return (

            <div className="conta">
                <Header />
                <h3>List of participants</h3>
                <AddNewParticipant handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
                <EmpTable  participants={this.state.participants}/>
          </div>    
        );
  
  }
}

class AddNewParticipant extends React.Component{
 
  render (){
    return (
      <form  onSubmit={this.props.handleSubmit}>
        <input className="inputStyle" type="text" name="name" placeholder="Full Name" onChange={this.props.handleChange} />
        <input className="inputStyle" type="email" name="email"  placeholder="Email-address" onChange={this.props.handleChange} />
        <input className="inputStyle" type="phone" name="phone"  placeholder="Phone number" onChange={this.props.handleChange} />
        <input className="inputStyle" type="submit" value="Add New"/>
      </form>
    );
  }
}

class EmpTable extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      asending : true
    };
    this.handleSort = this.handleSort.bind(this);
  }
  
  handleSort(){
    if(this.state.asending){
      this.setState({asending:false});
    }else {
      this.setState({asending:true}); 
    }

  }


  render() {
    //var participants = this.state.participants;
      
    var rows =[ ];
    var tempArr = this.props.participants;
    if(this.state.asending){
      tempArr.sort(function(emp1 , emp2){
        return emp1.name < emp2.name;
      });
    }else {
      tempArr.sort(function(emp1 , emp2){
        return emp1.name > emp2.name;
      }); 
    }

    tempArr.forEach(function(participant){
      rows.push(<EmpRow  key={participant.id} index={participant.id} participant={participant} />);
    });
    
    return(
      <div>
        
        <table>
          <thead>
          <tr id="thr"><th className="pointer" onClick={this.handleSort}>Name</th><th>E-mail address</th><th>Phone number</th><th></th><th></th></tr> 
          </thead>
            <tbody>
              {rows}
          </tbody>
        </table>
      </div>
      );
  }
}

class EmpRow extends React.Component{
  constructor(props) {
    super(props);
  
    this.state = { editing : false};
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleSave(){
    this.setState({editing : false});
  }

  handleCancel(){
    this.setState({editing : false});
  }

  handleEdit(){
    this.setState({editing : true});
  }

  handleDelete(){
    this.setState({editing : false});
  }

  normalRender(){
    return (
        
          <tr><td>{this.props.participant.name}</td>
            <td>{this.props.participant.email}</td>
            <td>{this.props.participant.phone}</td>
            <td><button className="eBtn" onClick={this.handleEdit}><i className="fa fa-pencil eSty" aria-hidden="true"></i></button></td>
            <td><button className="eBtn" onClick={this.handleDelete}><i className="fa fa-trash-o eSty" aria-hidden="true"></i></button></td></tr>
        
      );
  }

  editingRender(){
    return (
        
          <tr>
            <td><input type="text" defaultValue={this.props.participant.name}/></td>
            <td><input type="email" defaultValue={this.props.participant.email}/></td>
            <td><input type="number" defaultValue={this.props.participant.phone}/></td>
            <td><button id="saveBtn" className="btn"  onClick={this.handleSave}>Save</button></td>
            <td><button className="btn"  onClick={this.handleCancel}>Cancel</button></td></tr>
        
      );
  }

  render() {
      if(this.state.editing)
        return this.editingRender();
      else
        return this.normalRender();
  }
}

class Header extends React.Component{
  render(){
    return (
      <div id="header">
        <img id="logo" src="logo.png" alt="Nord Software"/>
      </div>
    ); }
}


export default App;