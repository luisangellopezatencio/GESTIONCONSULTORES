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
}