package com.camequmansys.camequmansys.service;

import com.camequmansys.camequmansys.domain.StringObject;
import com.camequmansys.camequmansys.domain.UseEquipment;

import java.util.List;

public interface UseEquipmentService {
    StringObject getAll();
    String insert(UseEquipment useEquipment);
}
