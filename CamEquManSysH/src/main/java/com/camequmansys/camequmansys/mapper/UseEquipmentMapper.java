package com.camequmansys.camequmansys.mapper;

import com.camequmansys.camequmansys.domain.UseEquipment;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface UseEquipmentMapper {
    /**
     * 查询所有
     * @return
     */
    List<UseEquipment> getAll();

    /**
     * 插入数据
     * @param useEquipment
     * @return
     */
    int insert(UseEquipment useEquipment);

}
