package com.kchaimae.web.rest.vm;

import com.kchaimae.domain.TypeFormation;
import java.util.List;

public class GroupedTypeFormation {

    private String type;

    private List<TypeFormation> types;

    public GroupedTypeFormation() {}

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<TypeFormation> getTypes() {
        return types;
    }

    public void setTypes(List<TypeFormation> types) {
        this.types = types;
    }
}
