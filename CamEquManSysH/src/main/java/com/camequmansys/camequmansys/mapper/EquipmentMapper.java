package com.camequmansys.camequmansys.mapper;

import com.camequmansys.camequmansys.domain.Equipment;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipmentMapper {
    /**
     * 获取所有
     * @return
     */
    List<Equipment> getAll();
    List<Equipment> getAllRuKu(String status);
    List<Equipment> findEquipmentByid(String id);
    int insert(Equipment equipment);
    int insertEquipments(List<Equipment> equipment);
    int updateById(Equipment equipment);
    int updateStatusById(Equipment equipment);
}
