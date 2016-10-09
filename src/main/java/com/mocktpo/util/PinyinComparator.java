package com.mocktpo.util;

import net.sourceforge.pinyin4j.PinyinHelper;

import java.util.Comparator;

public class PinyinComparator implements Comparator<Object> {

    public int compare(Object one, Object another) {
        return toPinyin(one).compareTo(toPinyin(another));
    }

    private String toPinyin(Object object) {

        String str = object.toString();
        StringBuffer sb = new StringBuffer();

        String[] pinyinArrayPerCharacter;
        for (int i = 0; i < str.length(); i++) {
            pinyinArrayPerCharacter = PinyinHelper.toHanyuPinyinStringArray(str.charAt(i));
            if (pinyinArrayPerCharacter != null && pinyinArrayPerCharacter.length > 0) {
                for (String letter : pinyinArrayPerCharacter) {
                    sb.append(letter);
                }
            }
        }

        return sb.toString();
    }
}
