package com.camequmansys.camequmansys.service;

import com.camequmansys.camequmansys.domain.Equipment;
import com.camequmansys.camequmansys.domain.StringObject;

import java.util.List;

public interface EquipmentService {
    List<Equipment> getAll();
    List<Equipment> getAllRuKu(String stauts);
    String addEquipments(List<Equipment> equipmentList);
    String updateById(Equipment equipment);
    String updateStatusById(Equipment equipment);
    String addEquipment(Equipment equipment);
    StringObject getEquipmentById(String id);
}
