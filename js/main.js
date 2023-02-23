'use strict'


window.addEventListener('load',()=>{


const formulario=document.querySelector('#formulario');
const campo=document.querySelector('#campo');
const caja=document.querySelector('#caja');
const resultado=document.querySelector('#resultado');

const regExp=/^\d{3}-[A-Z]{1}$/;

const arrayCoches=[
		{
			matricula:'123-K',
			modelo:'modelo1',
			propietario:'Juan'

		},
		{
			matricula:'124-L',
			modelo:'modelo2',
			propietario:'Fernanda'

		},
		{
			matricula:'125-M',
			modelo:'modelo3',
			propietario:'Pepe'

		},
		{
			matricula:'126-S',
			modelo:'modelo4',
			propietario:'Isa'

		},
	];

	const arrayMultas=[
		{
			matricula:'123-K',
			multas:['multas1','multas2','multas3','multas4' ],
		},
		{
			matricula:'124-L',
			multas:['multas1','multas2' ],
		},
		{
			matricula:'125-M',
			multas:['multas1'],
		},
		
	];

formulario.addEventListener('submit',ev=>{
	ev.preventDefault();
	validar()
	
})


const comprobarCoche=async(matricula)=>{

		let coche=arrayCoches.find((item)=>item.matricula==matricula);

		if(coche){
			 return(coche)
		}else{
			throw(`el coche con matrícula ${matricula} no existe`);
		}

	
}//comprobarCoche


const comprobarMulta=async(coche)=>{

		let multa=arrayMultas.find(item=>item.matricula==coche.matricula);
		
		if(multa){

			return (
				{
				matricula:coche.matricula,
				modelo:coche.modelo,
				propietario:coche.propietario,
				multas:multa.multas.length
				})
		}else{
			throw(`El coche con matricula ${coche.matricula} no tiene multas`)
		}

	
}

const recogerDatos=async(matricula)=>{

	try{

		let coche=await comprobarCoche(matricula);
		let respuestaMultas=await comprobarMulta(coche)

		return `<td>${respuestaMultas.matricula}</td> 
				<td>${respuestaMultas.modelo}</td> 
				<td>${respuestaMultas.propietario}</td>
				<td>${respuestaMultas.multas}</td> `;
	}catch(error){
		throw error;
	}

}

const validar=()=>{
resultado.innerHTML='';
caja.innerHTML=''
	const matricula=campo.value;

	if(regExp.test(matricula)){
		recogerDatos(matricula)
			.then(res=>resultado.innerHTML=res)
			.catch(error=>caja.innerHTML=error)
	}else{
		caja.innerHTML='Introduce una matrícula correcta';
	}
}


})//LOAD


