// swal-flow.service.ts
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Observable, from, throwError, EMPTY } from 'rxjs';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';

type FlowMsgs = {
  loadingTitle: string;
  loadingText: string;
  successTitle: string;
  successText: string;
  errorTitle: string;
  errorText: string;
};

type ConfirmMsgs = {
  title: string;
  text?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
};

@Injectable({ providedIn: 'root' })
export class SwalFlowService {

  // Mensajes centralizados
  private readonly MSG_SAVE: FlowMsgs = {
    loadingTitle: 'Guardando...',
    loadingText: 'Por favor, espera mientras se guarda el registro.',
    successTitle: 'Guardado con éxito',
    successText: '',
    errorTitle: 'Error',
    errorText: 'Hubo un error al guardar el registro.'
  };

  private readonly MSG_UPDATE: FlowMsgs = {
    loadingTitle: 'Actualizando...',
    loadingText: 'Por favor, espera mientras se actualiza el registro.',
    successTitle: 'Guardado con éxito',
    successText: '',
    errorTitle: 'Error',
    errorText: 'Hubo un error al actualizar el registro.'
  };

  private readonly MSG_DELETE: FlowMsgs = {
    loadingTitle: 'Eliminando...',
    loadingText: 'Por favor, espera.',
    successTitle: 'Eliminado',
    successText: 'Se ha eliminado correctamente.',
    errorTitle: 'Error',
    errorText: 'No se pudo eliminar.'
  };

  private readonly CONFIRM_DELETE: ConfirmMsgs = {
    title: '¿Estás seguro?',
    text: 'Esta acción no se puede deshacer.',
    confirmButtonText: 'Sí, eliminarlo',
    cancelButtonText: 'No, cancelar'
  };

  
run<T>(request$: Observable<T>, msgs: FlowMsgs, onDone?: () => void): Observable<T> {
  Swal.fire({
    title: msgs.loadingTitle,
    text: msgs.loadingText,
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading()
  });

  return request$.pipe(
    switchMap((res) => {
      Swal.close(); // cierra el loading ANTES del success
      return from(Swal.fire({
        title: msgs.successTitle,
        text: msgs.successText,
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#28a745'
      })).pipe(
        tap(() => onDone?.()),
        map(() => res)
      );
    }),
    catchError((err) => {
      Swal.close(); // cierra el loading ANTES del error
      return from(Swal.fire({
        title: msgs.errorTitle,
        text: msgs.errorText,
        icon: 'error',
        confirmButtonText: 'OK'
      })).pipe(
        switchMap(() => throwError(() => err))
      );
    })
  );
}

  confirmRun<T>(
    requestFactory: () => Observable<T>,
    confirm: ConfirmMsgs,
    msgs: FlowMsgs,
    onDone?: () => void
  ): Observable<T> {
    return from(Swal.fire({
      title: confirm.title,
      text: confirm.text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: confirm.confirmButtonText ?? 'Sí',
      cancelButtonText: confirm.cancelButtonText ?? 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d'
    })).pipe(
      switchMap(r => r.isConfirmed ? this.run(requestFactory(), msgs, onDone) : EMPTY)
    );
  }

  // Helpers
  save<T>(request$: Observable<T>, onDone?: () => void): Observable<T> {
    return this.run(request$, this.MSG_SAVE, onDone);
  }

  update<T>(request$: Observable<T>, onDone?: () => void): Observable<T> {
    return this.run(request$, this.MSG_UPDATE, onDone);
  }

  deleteConfirm<T>(requestFactory: () => Observable<T>, onDone?: () => void): Observable<T> {
    return this.confirmRun(requestFactory, this.CONFIRM_DELETE, this.MSG_DELETE, onDone);
  }

  // Variantes
  saveWith<T>(request$: Observable<T>, overrides: Partial<FlowMsgs>, onDone?: () => void): Observable<T> {
    return this.run(request$, { ...this.MSG_SAVE, ...overrides }, onDone);
  }

  updateWith<T>(request$: Observable<T>, overrides: Partial<FlowMsgs>, onDone?: () => void): Observable<T> {
    return this.run(request$, { ...this.MSG_UPDATE, ...overrides }, onDone);
  }

  deleteConfirmWith<T>(
    requestFactory: () => Observable<T>,
    confirmOverrides?: Partial<ConfirmMsgs>,
    msgOverrides?: Partial<FlowMsgs>,
    onDone?: () => void
  ): Observable<T> {
    return this.confirmRun(
      requestFactory,
      { ...this.CONFIRM_DELETE, ...(confirmOverrides ?? {}) },
      { ...this.MSG_DELETE, ...(msgOverrides ?? {}) },
      onDone
    );
  }
}