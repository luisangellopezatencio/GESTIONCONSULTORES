public with sharing class ConsultorController {

    // Con sahoring el usuario solo ve los consultores a los que tiene
    
    @AuraEnabled(Cacheable=true)
    public static List<Consultor__c> getConsultores(){
        try {
            // Con security_enforced el usuario solo ve los campos a los que tiene permiso
            return [SELECT Id, Name FROM Consultor__c WITH SECURITY_ENFORCED];
        } catch (Exception e) {
            throw new AuraHandledException('No se pudieron obtener los consultores');
        }      
    }

    @AuraEnabled
    public static String postReporte(String idConsultor, List<Map<String, Object>> reportes) {
        List<ReporteHoras__c> reportesDB = new List<ReporteHoras__c>();

        for ( Map<String, Object> reporte : reportes ) {
            
            Date fecha = Date.valueOf((String) reporte.get('fecha'));
            Decimal horas = Decimal.valueOf((String) reporte.get('horas'));
            String tipoHora = (String) reporte.get('tipoHora');
            String proyecto = (String) reporte.get('proyecto');

            reportesDB.add(new ReporteHoras__c(
                Consultor__c = idConsultor,
                Fecha__c = fecha,
                Horas__c = horas,
                Tipo_de_hora__c = tipoHora,
                Proyecto__c = proyecto
            ));           
        }

        try {
                insert reportesDB;
                return 'Reporte guardado con exito';
            } catch (Exception e) {
                throw new AuraHandledException('Error al guardar: ' + e.getMessage());
            }
    }
}