import React, {Component} from 'react';
import './bootstrap.min.css';
import Header from './components/Header';
import NuevaCita  from './components/NuevaCita';
import ListaCitas  from './components/ListaCitas';

class App extends Component{

  state={
      citas:[]
  }

  //Cuando la aplicacion carga
  componentDidMount(){
    const citasLs= localStorage.getItem('citas');

    if(citasLs){
      this.setState({
        citas: JSON.parse(citasLs)
      })
    }
  }

  //Cuando creamos o eliminamos una cita
  componentDidUpdate(){
    localStorage.setItem('citas', JSON.stringify(this.state.citas))
  }

  crearNuevaCita = datos => {
    const citas = [...this.state.citas, datos];
    this.setState({
      citas
    });
  }

  //Elimina la cita del state
  eliminarCita = id => {
    //Hago una copia del state
    const citasActuales = [...this.state.citas];

    //Utilizar filter para sacar el elemento id del arreglo
    const citas = citasActuales.filter(cita => cita.id !== id)

    this.setState({citas})
  }

  render(){
    return(
      <div className="container">
        <Header title='Administrador Pacientes Veterinaria' />

        <div className="row">
            <div className="col-md-10 mx-auto">
                <NuevaCita
                  crearNuevaCita={this.crearNuevaCita}
                 />
            </div>
            <div className="mt-5 col-md-10 mx-auto">
                <ListaCitas citas={this.state.citas}
                  eliminarCita={this.eliminarCita}/>
            </div>
        </div>
      </div>
     
    );
  }
}

export default App;
