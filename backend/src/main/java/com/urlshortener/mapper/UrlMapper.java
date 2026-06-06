package com.urlshortener.mapper;

import com.urlshortener.dto.UrlResponse;
import com.urlshortener.model.Url;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Value;

@Mapper(componentModel = "spring")
public interface UrlMapper {

    @Mapping(target = "shortUrl", source = "shortCode", qualifiedByName = "toShortUrl")
    UrlResponse toResponse(Url url);

    @Named("toShortUrl")
    default String toShortUrl(String shortCode) {
        // Base URL injected via Spring context via a wrapper — resolved in UrlMapperHelper
        return shortCode;
    }
}
