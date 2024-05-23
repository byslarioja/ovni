import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/eula")({
  component: () => (
    <article className="bg-gray-100 text-gray-900 leading-relaxed">
      <header className="bg-blue-800 text-white p-6">
        <h1 className="text-3xl font-bold">
          Contrato de Licencia para Usuarios Finales (EULA)
        </h1>
      </header>
      <main className="container mx-auto p-6 bg-white shadow-md rounded-lg">
        <section className="mb-8">
          <p className="text-lg">
            Lea este contrato de licencia para usuarios finales ("EULA") con
            atención antes de instalar nuestro software. Este EULA es un
            contrato legal entre usted, usuario final individual, que instala el
            software. Al hacer clic en el botón "ACEPTO" o similar al instalar
            el software, reconoce que ha leído este EULA, que lo comprende, que
            tiene la capacidad legal de hacerlo y que acepta estar sujeto a sus
            condiciones. Si no acepta ninguna de las condiciones de este EULA,
            entonces deberá hacer clic en el botón de "RECHAZAR" o similar y
            finalizar el proceso de instalación.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Condiciones Generales y Específicas
          </h2>
          <p className="mb-4">Este EULA contiene dos partes:</p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <strong>Parte I:</strong> Define las condiciones generales que se
              aplican a todo el software y la documentación ("Condiciones
              generales").
            </li>
            <li>
              <strong>Parte II:</strong> Define las condiciones que son
              específicas de cada software y su documentación que usted utilice
              ahora o en cualquier momento futuro ("Condiciones específicas").
              En la medida en que haya un conflicto entre las Condiciones
              específicas y las Condiciones generales, prevalecerán las
              Condiciones específicas.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">
            Parte I: Condiciones Generales
          </h3>
          <h4 className="text-lg font-semibold mb-2">Tipos de Licencias</h4>
          <p className="mb-4">
            Se concede una licencia del software, pero no se vende el software.
          </p>

          <h4 className="text-lg font-semibold mb-2">
            Restricciones de la Licencia
          </h4>
          <p className="mb-4">No podrá ni directa ni indirectamente:</p>
          <ul className="list-decimal list-inside mb-4">
            <li>
              Hacer ingeniería inversa, descompilar, desmontar o intentar
              derivar de otro modo el código objeto, código fuente o las ideas o
              algoritmos del software o cualquier clave de licencia que haya
              obtenido.
            </li>
            <li>
              Modificar, traducir, adaptar o crear obras derivadas del software,
              documentación o claves de licencia que haya obtenido de cualquier
              modo (excepto en la medida en que las leyes aplicables prohíban
              específicamente tal restricción para fines de interoperabilidad,
              en cuyo caso acepta ponerse primero en contacto con nosotros y
              proporcionarnos una oportunidad de crear tales cambios según sean
              necesarios para fines de interoperabilidad).
            </li>
            <li>
              Alquilar, arrendar, distribuir, vender, revender, asignar o
              transferir de cualquier otro modo el software o cualquier copia
              del mismo (excepto si se especifica lo contrario en las
              condiciones generales de este EULA).
            </li>
            <li>
              Hacer uso compartido del software o para beneficio de cualquier
              otra persona o entidad.
            </li>
            <li>
              Eliminar cualquier aviso de derecho propietario del software o de
              la documentación o intentar burlar cualquier mecanismo de
              protección contra copia incluido con el software.
            </li>
            <li>
              Usar el software con cualquier otro fin distinto de su propósito
              original.
            </li>
            <li>
              Usar el software para intentar obtener u obtener acceso no
              autorizado a cualquier software, como oferta de servicios,
              plataforma informática en la nube o cualquier servicio
              proporcionado por nosotros o nuestros sistemas o redes
              relacionados.
            </li>
            <li>
              Usar el software para cualquier fin ilícito o prohibido o como
              medio para infringir cualquier derecho de terceros.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h4 className="text-lg font-semibold mb-2">Cambios</h4>
          <p className="mb-4">
            Es posible que ocasionalmente revisemos, actualicemos o cambiemos de
            cualquier otro modo este EULA ("Cambios"). Tales cambios tendrán
            efecto inmediato mediante actualización del software, recomendando
            siempre usar la última versión disponible en las tiendas.
          </p>

          <h4 className="text-lg font-semibold mb-2">Mayoría de Edad</h4>
          <p className="mb-4">
            Debe ser mayor de edad en su estado, provincia, territorio, país o
            jurisdicción para obtener una licencia nuestra para usar el software
            y la documentación.
          </p>

          <h4 className="text-lg font-semibold mb-2">Garantía</h4>
          <p className="mb-4">
            Garantizamos que los soportes físicos en los que se distribuye el
            software, si corresponde, están libres de defectos y que el software
            se adecuará sustancialmente a la descripción de su documentación. Si
            el software contiene defectos, su único y exclusivo recurso será que
            nosotros, a nuestra sola discreción:
          </p>
          <ul className="list-decimal list-inside mb-4">
            <li>
              Hagamos todo lo posible por corregir los defectos del software o
            </li>
            <li>Reemplacemos el software defectuoso.</li>
          </ul>
          <p className="mb-4">
            Los defectos del software significan que el software no se adecúa
            sustancialmente a la descripción de su documentación. Nuestras
            obligaciones de garantía limitada bajo esta sección están sujetas a
            las siguientes condiciones:
          </p>
          <ul className="list-decimal list-inside mb-4">
            <li>
              El software debe haberse instalado correctamente y utilizado
              conforme a las instrucciones de su documentación.
            </li>
            <li>
              No se ha realizado ninguna modificación, alteración o adición al
              software por personas distintas de nosotros.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h4 className="text-lg font-semibold mb-2">Indemnización</h4>
          <p className="mb-4">
            Acepta indemnizar y exonerarnos a nosotros y nuestros afiliados,
            gerentes, directores, agentes, empleados, socios, contratistas
            independientes y licenciantes, pasados y presentes, de toda
            reclamación o demanda, incluidos los honorarios razonables de
            letrados, realizada por terceros en relación con:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              Su uso o uso indebido del software o la documentación o cualquier
              componente de los mismos que no sean los permitidos bajo este
              EULA.
            </li>
            <li>Su incumplimiento del EULA.</li>
            <li>
              Su infracción, apropiación indebida o violación de cualquier
              propiedad intelectual u otros derechos de otra persona o entidad.
            </li>
            <li>Cualquier contenido creado o almacenado por usted.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h4 className="text-lg font-semibold mb-2">
            Limitación de las Responsabilidades
          </h4>
          <p className="mb-4">
            En la máxima medida en que lo permita la legislación vigente,
            nosotros ni nuestros afiliados, directores, gerentes, empleados o
            licenciantes o proveedores de servicios nunca seremos responsables
            (conjuntamente o por separado) ante usted por ningún daño especial,
            ejemplar, punitivo, incidental, daños indirectos o emergentes de
            cualquier clase, pérdida de ingresos o beneficios, o pérdida de
            oportunidades empresariales, pérdida de negocio o beneficios, acceso
            no autorizado, pérdida o daños de cualquier información, demoras,
            interrupción, incapacidad para usar o pérdida de cualquier servicio,
            pérdida resultante de error del sistema o de servicio del sistema,
            avería o bloqueo, no transferir, leer o transmitir información de
            manera precisa, incompatibilidad del sistema o fallos de la
            seguridad del sistema, u otras pérdidas pecuniarias similares, sea
            cual sea su causa, tanto procedentes de este EULA o relacionados con
            él, independientemente de la teoría de responsabilidad (contrato,
            agravio (incluyendo negligencia), estricta responsabilidad u otro),
            tanto si tales daños eran previsibles y si hubiésemos sido
            notificados de la posibilidad de tales daños.
          </p>
        </section>

        <section className="mb-8">
          <h4 className="text-lg font-semibold mb-2">
            Ley Aplicable y Jurisdicción
          </h4>
          <p className="mb-4">
            Si es residente de Argentina (incluidas sus posesiones y
            territorios), entonces: este EULA se regirá por las leyes de
            Argentina y las leyes de la provincia de La Rioja.
          </p>
        </section>
      </main>
    </article>
  ),
});
