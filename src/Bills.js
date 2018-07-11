import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel, Table, InputGroup } from "react-bootstrap";
import Autosuggest from 'react-autosuggest';
import "./Bills.css";
import  firebase from './firebase/firebase';
import { auth } from './firebase/firebase';
import Loader from './Loader';


const getSuggestionValue = suggestion => suggestion.item;
const renderSuggestion = suggestion => (
  <span>
    {suggestion.item}
  </span>
);

class Bills extends Component {
constructor(props) {
super(props);
var today = new Date();
this.state = {
name: null,
email: null,
uid : null,
item: "",
items: [],
groupitems: [],
price: 0.01,
add: true,
cyear: today.getFullYear(),
cmonth: (today.getMonth() + 1),
amonth: (today.getMonth() + 1),
ayear: today.getFullYear(),
smonth: (today.getMonth() + 1),
syear: today.getFullYear(),
smonthmax: 12,
amonthmax: 12,
error: null,
value: '',
suggestions: []
};
this.toggleList = this.toggleList.bind(this);
this.displayItem = this.displayItem.bind(this);
}

//Suggestion
getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : this.state.groupitems.filter(itm =>
    itm.item.toLowerCase().slice(0, inputLength) === inputValue
  );
};
onChange = (event, { newValue }) => {
  event.preventDefault();
  this.setState({
    value: newValue
  });
};

onSuggestionsFetchRequested = ({ value }) => {
  this.setState({
    suggestions: this.getSuggestions(value)
  });
};

onSuggestionsClearRequested = () => {
  this.setState({
    suggestions: []
  });
};
//

componentWillMount(){
//var today = new Date();
auth.onAuthStateChanged(authUser => {
if (authUser && this.state.name==null){
  this.setState({ name: authUser.displayName, email: authUser.email, uid: authUser.uid });
  //console.log(this.state.uid);
  const itemsRef = firebase.database().ref('bills/'+this.state.uid+'/'+ this.state.smonth+this.state.syear);
  itemsRef.on('value', (snapshot) => {
    let items = snapshot.val();
    let newState = [];
    let totalState = [];
    //console.log(items);
    let i=0;
    for (let itemname in items) {
      //console.log(items[itemname]);
      totalState.push({item:itemname,price:0});
      //console.log(totalState);
      for (let itemid in items[itemname]) {
        newState.push({
          id: itemid,
          item: items[itemname][itemid].item,
          price: parseFloat(items[itemname][itemid].price).toFixed(2)
        });
        totalState[i].price+=parseFloat(items[itemname][itemid].price);
      }
      totalState[i].price=totalState[i].price.toFixed(2);
      i++;
    }
    this.setState({
      items: newState,
      groupitems: totalState
    });
  });
}
else if(!authUser){
  this.props.history.push("/login");
}
});
//user = firebase.auth().currentUser;
}
componentDidMount() {

}
displayItem = event => {
  event.preventDefault();
const itemsRef = firebase.database().ref('bills/'+this.state.uid+'/'+ this.state.smonth+this.state.syear);
  itemsRef.on('value', (snapshot) => {
    let items = snapshot.val();
    let newState = [];
    let totalState = [];
    //console.log(items);
    let i=0;
    for (let itemname in items) {
      //console.log(items[itemname]);
      totalState.push({item:itemname,price:0});
      //console.log(totalState);
      for (let itemid in items[itemname]) {
        newState.push({
          id: itemid,
          item: items[itemname][itemid].item,
          price: parseFloat(items[itemname][itemid].price).toFixed(2)
        });
        totalState[i].price+=parseFloat(items[itemname][itemid].price);
      }
      totalState[i].price=totalState[i].price.toFixed(2);
      i++;
    }
    this.setState({
      items: newState,
      groupitems: totalState
    });
  });
}
removeItem(itemId, itemName) {
  const itemRef = firebase.database().ref('bills/'+this.state.uid+'/'+this.state.smonth+this.state.syear+"/"+itemName+'/'+itemId);
  itemRef.remove();
}
toggleList(){
  this.setState({
    add: !this.state.add
  });
}
validateForm() {
  return this.state.value.length > 0 && this.state.price > 0;
}

handleChange = event => {
  //console.log(event.target.id);
  this.setState({
    [event.target.id]: event.target.value
  });
  if(this.state.syear === this.state.cyear) {
    this.setState({
      smonthmax: this.state.cmonth
    });
  }
  else {
    this.setState({
      smonthmax: 12
    });
  }
  if(this.state.ayear === this.state.cyear) {
    this.setState({
      amonthmax: this.state.cmonth
    });
  }
  else {
    this.setState({
      amonthmax: 12
    });
  }
}

handleSubmit = event => {
event.preventDefault();
//var today = new Date();
if (this.state.name != null) {
  const bill = { item: this.state.value, price: this.state.price}
  firebase.database().ref('bills/'+this.state.uid+'/'+ this.state.amonth+this.state.ayear).child(bill.item).push(bill);
  //console.log('error here');
  this.setState(
    {
      item: "",
      value: "",
      price: 0.01,
      error: null
    }
  );
}
}
renderList() {
return(
<div className = 'Bills'>
  <form onSubmit={this.displayItem}>
    <Button block bsStyle="success" bsSize="large" onClick={this.toggleList} >
      + Add Item
    </Button>
    
  <br/>
    <FormGroup controlId="smonth" bsSize="large">
      <ControlLabel>Month</ControlLabel>
      <FormControl value={this.state.smonth} onChange={this.handleChange} type="number" min="1" step="1" max={this.state.smonthmax} />
    </FormGroup>
    <FormGroup controlId="syear" bsSize="large">
      <ControlLabel>Year</ControlLabel>
      <FormControl value={this.state.syear} onChange={this.handleChange} type="number" min="2018" step="1" max={this.state.cyear} />
    </FormGroup>
    <Button block bsSize="large" type="submit">
      Show
    </Button>
  </form>
  <br/>
  <Table bordered condensed hover responsive>
    <thead>
      <tr>
        <th colSpan="4">List Of All Items</th>
      </tr>
      <tr>
        <th>#</th>
        <th>Item Name</th>
        <th>Item Price</th>
        <th>Remove Item</th>
      </tr>
    </thead>
    <tbody>
    {this.state.items.map((i, index) => {
      return (
        <tr key={i.id}>
          <td>{index+1}</td>
          <td>{i.item}</td>
          <td>${i.price}</td>
          <td>
            <span className="rmitem" onClick={() => this.removeItem(i.id, i.item)} >X</span>
          </td>
        </tr>
      )
    })}
    </tbody>
  </Table>
  <Table striped bordered condensed hover responsive>
    <thead>
      <tr>
        <th colSpan="3">Amount Spent On Each Item</th>
      </tr>
      <tr>
        <th>#</th>
        <th>Item</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
    {this.state.groupitems.map((i, index) => {
      return (
        <tr key={index+1}>
          <td>{index+1}</td>
          <td>{i.item}</td>
          <td>${i.price}</td>
        </tr>
      )
    })}
    </tbody>
  </Table>
  <ul>
    
  </ul>
</div>
);
}
renderForm() {
  const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Item Name',
      value,
      onChange: this.onChange,
      className: "form-control"
    };
return (
<div className="Bills">
  <form onSubmit={this.handleSubmit}>
    <Button block bsSize="large" onClick={this.toggleList} >
      Item List
    </Button>

    <br/>

    <FormGroup controlId="amonth" bsSize="large">
      <ControlLabel>Month</ControlLabel>
      <FormControl value={this.state.amonth} onChange={this.handleChange} type="number" min="1" step="1" max={this.state.amonthmax} />
    </FormGroup>
    <FormGroup controlId="ayear" bsSize="large">
      <ControlLabel>Year</ControlLabel>
      <FormControl value={this.state.ayear} onChange={this.handleChange} type="number" min="2018" step="1" max={this.state.cyear} />
    </FormGroup>
    {/*
    <FormGroup controlId="item" bsSize="large">
      <ControlLabel>Item</ControlLabel>
      <FormControl autoFocus type="text" value={this.state.item} onChange={this.handleChange}/>
    </FormGroup>
  */}
  <FormGroup>

    <ControlLabel>Item</ControlLabel>
    <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
      />
  </FormGroup>
    <FormGroup controlId="price" bsSize="large">
      <ControlLabel>Price</ControlLabel>
      <InputGroup>
        <InputGroup.Addon className="addon">$</InputGroup.Addon>
        <FormControl value={this.state.price} onChange={this.handleChange} type="number" min="0.01" step="0.01" />
      </InputGroup>
    </FormGroup>
    <Button block bsSize="large" disabled={!this.validateForm()} type="submit" >
      Add
    </Button>
  </form>
</div>
);
}
  render() {
    if(this.state.name !=null) {
      if(this.state.add === true) {
        return (<div>{this.renderForm()}</div>);
      }
      else {
        return (<div>{this.renderList()}</div>);
      }
    }
  return(<Loader/>);
  }
}

export default Bills;