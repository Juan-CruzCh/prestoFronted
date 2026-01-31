import Swal from 'sweetalert2';

  export async function  confirmarEliminar(nombre?: string): Promise<boolean> {
    return Swal.fire({
      title: '¿Está seguro?',
      text: nombre
        ? `Esta acción eliminará ${nombre} y no se puede deshacer`
        : 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      reverseButtons: true
    }).then(result => result.isConfirmed);
  }

 export function exito(mensaje: string) {
    return Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: mensaje
    });
  }

  export function  error(mensaje: string) {
    return Swal.fire({
      icon: 'error',
      title: 'Error',
      text: mensaje
    });
  }

  export function loading(mensaje = 'Procesando...') {
    return Swal.fire({
      title: mensaje,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }
  export function  advertencia(mensaje: string) {
    return Swal.fire({
      icon: 'warning',
      title: 'Atención',
      text: mensaje
    });
  }

 export  function confirmarPago(clienteNombre: string, meses: string[], total: number): Promise<boolean> {
  const mesesTexto = meses.join(', ');

  return Swal.fire({
    title: 'Confirmar pago',
    html: `
      <p>Cliente: <strong>${clienteNombre}</strong></p>
      <p>Meses seleccionados: <strong>${mesesTexto}</strong></p>
      <p>Total a pagar: <strong>Bs ${total}</strong></p>
      <p>¿Está seguro de realizar el pago?</p>
    `,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, pagar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true
  }).then(result => result.isConfirmed);
}


