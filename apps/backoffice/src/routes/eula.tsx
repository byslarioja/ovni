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

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Cumplimiento de Leyes</h2>
          <p>
            Acepta usar el Software y la Documentación en cumplimiento de todas
            las leyes aplicables, incluidas las leyes locales del país o región
            en que resida y en cumplimiento de todas las leyes y reglamentos de
            exportación aplicables. No usará el Software ni la Documentación
            para ningún fin prohibido por la ley aplicable.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Derechos de Propiedad Intelectual
          </h2>
          <p>
            Acepta que el Software y la Documentación son de nuestra propiedad y
            que retenemos todo derecho, titularidad e interés con respecto al
            Software y la Documentación y a todos los copyrights, secretos
            comerciales, patentes, marcas comerciales y cualquier otra propiedad
            intelectual e industrial y derechos de propiedad, incluidos
            registros, solicitudes, renovaciones y ampliaciones de dichos
            derechos. No puede eliminar ningún título, marca comercial o nombre
            comercial, aviso de copyright, leyenda u otras marcas de propiedad
            del Software o la Documentación. No se le otorga ningún derecho,
            licencia o interés en ninguna de nuestras marcas comerciales o
            marcas de servicio. No podrá modificar el Software ni crear trabajos
            derivados basados en el Software o la Documentación.
          </p>
          <p>
            El contenido del material audiovisual grabado mediante nuestra
            aplicación de software es de exclusiva responsabilidad de quien haya
            realizado dicha grabación. Nuestra política de control del material
            subido mediante nuestra aplicación de software filtrará aquellos que
            no cumpla con el cometido esencial de nuestro producto. Dicho
            material una vez subido y autorizado en nuestra plataforma podrá ser
            utilizado para su monetización sin derecho a compensar al creador
            del material audiovisual de percibir ninguna compensación.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Software y Tecnologías de Terceros
          </h2>
          <p>
            Este software podría incluir varios componentes de software o
            servicios de software de terceros ("Software de terceros"), que se
            proporcionan bajo condiciones de licencia separadas (las
            "Condiciones de terceros").
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Contenido</h2>
          <p>
            Posee y es responsable de datos, información, materiales u otro
            contenido, incluidos mapas, contactos y archivos, que cree como
            resultado del uso de nuestro Software o que almacene dentro del
            Software ("Contenido"). Será exclusivamente responsable de la
            exactitud, calidad, integridad, legalidad, fiabilidad, pertinencia y
            propiedad o derecho de propiedad intelectual de su Contenido. Acepta
            que toda pérdida o daño de cualquier clase que se produzca como
            resultado del uso de cualquier Contenido que cree o haya creado,
            cargado, publicado, compartido, transmitido, mostrado o puesto a
            disposición a través de su uso del Software es exclusivamente su
            responsabilidad y que nos indemnizará de toda reclamación de
            terceros relativa al Contenido conforme a la sección Indemnización.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Actualizaciones</h2>
          <p>
            Es posible que, en ocasiones, descarguemos e instalemos
            actualizaciones, correcciones de errores, mejoras de funciones o
            mejoras del Software ("Actualizaciones") en los dispositivos bajo su
            control o posesión, a menos que rechace esas Actualizaciones por
            adelantado. Si no desea recibir Actualizaciones, deberá notificarnos
            al respecto y, siempre que lo permita el Software, desactivar la
            función que permite las Actualizaciones automáticas. De lo
            contrario, acepta recibir dichas Actualizaciones de nosotros como
            parte de su uso del Software. Si no se instalan las Actualizaciones,
            podría no disfrutar de todas las ventajas del Software o este podría
            no funcionar correctamente. No estamos obligados a facilitarle
            asistencia para el Software si no se han instalado esas
            Actualizaciones. Tampoco tenemos ninguna obligación de crear
            Actualizaciones siguiendo ninguna programación y las Actualizaciones
            estarán disponibles a nuestra sola discreción. Si una Actualización
            es necesaria para cumplir las leyes aplicables, para solucionar una
            amenaza de seguridad real o posible en el Software bajo licencia,
            para reemplazar tecnologías que podrían infringir los derechos de
            propiedad intelectual de terceros o por cualquier otro motivo de
            importancia similar para nosotros ("Actualizaciones obligatorias"),
            le proporcionaremos tal Actualización obligatoria junto con un aviso
            que especifique que se trata de una Actualización obligatoria.
            Deberá instalar las Actualizaciones obligatorias sin demora y, en
            todo caso, nunca más tarde de diez (10) días laborales tras su
            recepción. Si no instalase las Actualizaciones obligatorias a
            tiempo, podría producirse la cancelación o suspensión de sus
            licencias para el Software correspondiente.
          </p>
          <p>
            También podríamos, en ocasiones, realizar el mantenimiento
            programado de la infraestructura y la programación utilizadas para
            proporcionar el Software, tiempo durante el que podría experimentar
            alguna interrupción para ese Software o el acceso a las cuentas y
            servicios asociados. Siempre que sea razonablemente posible, le
            avisaremos con antelación del mantenimiento. Acepta que, en
            ocasiones, podríamos necesitar llevar a cabo un mantenimiento de
            emergencia sin avisarle con antelación, tiempo durante el que
            podríamos suspender su acceso y uso del Software y de cualquier
            cuenta y servicio asociado.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Cumplimiento de Licencias
          </h2>
          <p>
            Comprende y acepta que podríamos, a través de una función de envío
            de informes del Software, supervisar remotamente el funcionamiento y
            uso del Software con fines técnicos, operativos, comerciales y
            legales, incluida la verificación del cumplimiento de las
            condiciones aquí incluidas ("Verificación"). Acepta facilitar tal
            Verificación, incluido realizar las acciones necesarias para
            garantizar que estén abiertos los puertos de firewall (según
            corresponda) y notificarnos si existe algún problema operativo que
            podría impedir la realización de la Verificación. Garantiza que ha
            obtenido todos los consentimientos y licencias necesarios para dicha
            Verificación, incluidos todos los consentimientos y licencias para
            el uso de datos e información relacionados con su uso del Software.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Derecho de Usar Datos</h2>
          <p>
            Acepta que podríamos recopilar datos e información relacionada,
            incluida aunque no limitada a información técnica de su dispositivo,
            sistema y software de aplicaciones y periféricos relacionados con su
            uso del Software, y que podríamos usar esta información para
            proporcionarle servicios y manejar, proporcionar, mejorar y
            desarrollar nuestros productos, servicios y tecnologías, para
            impedir o investigar el uso fraudulento o inapropiado de nuestros
            productos, servicios y tecnologías, para investigación y desarrollo,
            con fines antipiratería, para verificar un registro válido, para
            identificar si están disponibles nuevas Actualizaciones del Software
            para su dispositivo antes de enviarle un aviso para que instale una
            nueva actualización del Software y para cualquier otro fin descrito
            en este EULA. La información personal recopilada bajo este EULA
            estará sujeta a nuestra Política de privacidad.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Opiniones</h2>
          <p>
            No tiene ninguna obligación de proporcionarnos ideas, comentarios,
            información, conceptos, revisiones, conocimientos, técnicas,
            sugerencias, documentaciones, propuestas ni cualquier otro material
            ("Opiniones"). Sin embargo, si nos facilita Opiniones, si bien
            conserva la titularidad de dichas Opiniones, por el presente
            documento nos otorga una licencia no exclusiva, gratuita, perpetua,
            irrevocable, transmisible e ilimitada de uso y explotación de sus
            Opiniones con cualquier finalidad en todo el mundo. Asimismo, acepta
            no aplicar ningún "derecho moral" en las Opiniones ni sobre ellas,
            en la medida que lo permita la legislación aplicable. Además, si
            aporta sus Opiniones, manifiesta y garantiza que (i) esas Opiniones
            no contienen información confidencial o propiedad de terceros; (ii)
            no estamos obligados a mantener la confidencialidad, expresa o
            implícita, en relación con sus Opiniones; (iii) podríamos tener ya
            en cuenta o en desarrollo algo similar a sus Opiniones; y (iv) no
            tiene derecho a indemnización o reembolso alguno de nuestra parte
            por sus Opiniones bajo ninguna circunstancia.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Prevalencia del Contrato
          </h2>
          <p>
            El presente EULA constituye la totalidad del contrato entre usted y
            nosotros y sustituye a todas las demás comunicaciones y anuncios
            relativos al Software y a la Documentación. El Software o cualquier
            funcionalidad o parte de él podrían no estar disponibles en todos
            los idiomas o países. Si le hemos facilitado una traducción de la
            versión en inglés del presente EULA, usted acepta que dicha
            traducción se le facilita únicamente para su conveniencia y que la
            versión en inglés (no la traducción) del presente EULA será
            legalmente vinculante para usted. En caso de conflicto entre la
            versión en inglés del presente EULA y una de sus traducciones,
            prevalecerá la versión en inglés y no la traducción.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Divisibilidad de las Disposiciones
          </h2>
          <p>
            Si alguna condición o disposición del EULA es inválida, ilegal o no
            ejecutable en alguna jurisdicción: (i) la validez, legalidad y
            ejecutabilidad de las disposiciones restantes seguirán teniendo
            total vigencia y efecto, (ii) dicha invalidez, ilegalidad o no
            ejecutabilidad no se extenderán a ninguna otra jurisdicción y (iii)
            dicha invalidez, ilegalidad o no ejecutabilidad no afectarán a
            ninguna otra condición o disposición del EULA ni invalidarán o
            dejarán como no ejecutable tal condición o disposición en ninguna
            otra jurisdicción.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Encabezados</h2>
          <p>
            Los encabezados del EULA se incluyen únicamente para facilitar la
            lectura y no afectarán a la interpretación del EULA.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Renuncia y Rectificación/Modificación
          </h2>
          <p>
            Si una de las partes no ejerce o aplica alguno de sus derechos bajo
            este EULA, no constituirá una renuncia a tales derechos. Este EULA
            solo se puede modificar conforme a la sección titulada "Cambios".
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Compatibilidad</h2>
          <p>
            Algunas versiones del Software podrían no ser compatibles con
            diversos sistemas operativos y podríamos no publicar Actualizaciones
            para establecer la compatibilidad. El Software podría no ser
            compatible con sistemas operativos que adquiera ahora o en el
            futuro. Usted acepta que el Software podría tener incorporaciones y
            que el propio Software podría incorporarse a software y otras
            tecnologías que están bajo control o son propiedad de terceros. El
            presente EULA permanecerá vigente con dicha incorporación. Todo
            software o tecnología de terceros que pueda distribuirse junto con
            el Software como paquete de software de terceros puede estar sujeto
            a que usted acepte explícitamente un contrato de licencia con dicho
            tercero.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Software de Evaluación</h2>
          <p>
            Si el software se identifica como versión de demostración,
            evaluación o prueba en la Documentación aplicable, podrá instalar y
            acceder al Software solo con fines de evaluación o demostración.
            Salvo que cuente con nuestra autorización, no podrá utilizar nuestro
            Software para análisis competitivos ni para fines de carácter
            comercial, profesional o lucrativo de ningún otro tipo. Usted acepta
            que, al finalizar el período de evaluación, deberá dejar de utilizar
            el Software o bien adquirir una licencia para seguir utilizándolo.
            Si no la adquiere, al finalizar el período de evaluación, ya no
            estará autorizado a utilizar el Software y deberá dejar de utilizar
            inmediatamente el Software y eliminar y destruir todas las copias
            electrónicas del Software, lo que incluye, sin que sirva de
            limitación, toda la Documentación del usuario que pueda haberse
            facilitado como parte de la evaluación que se encuentre en su equipo
            informático o en cualquier otro dispositivo informático donde haya
            instalado el Software. Cualquier intento de evitar la tecnología de
            fecha de caducidad supondrá un incumplimiento del presente EULA y
            producirá la cancelación inmediata y automática de su licencia para
            utilizar el Software.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Derechos de Licencia</h2>
          <p>
            Bajo la concesión de derecho anterior recibe usted un derecho de uso
            (licencia) del Software, pero no le transmitimos su titularidad. El
            Software podrá incluir imágenes digitales, fotografías de catálogo,
            imágenes prediseñadas, fuentes, sonidos u otras obras protegidas por
            derechos de autor ("Materiales artísticos"). Las responsabilidades y
            restricciones relativas al Software se aplican igualmente a los
            Materiales artísticos. Nos reservamos todos los derechos que no le
            sean expresamente otorgados a usted en este EULA.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Restricciones de la Licencia
          </h2>
          <p>
            El Software podrá incluir tecnología de activación de productos y
            otras tecnologías diseñadas para evitar usos y copias no
            autorizados. No podrá incluir, integrar ni combinar el Software ni
            ningún ejecutable del Software (como .EXE, .MSI, .ISO o .DMG o
            ejecutable similar conocido ahora o desarrollado posteriormente) con
            ningún complemento de software u oferta de terceros, excepto cuando
            se trate de un contrato escrito expreso separado y plenamente
            formalizado con nosotros.
          </p>
        </section>
      </main>
    </article>
  ),
});
