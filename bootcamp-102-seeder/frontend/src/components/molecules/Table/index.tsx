import { Checkbox, styled } from "@mui/material";
import {
  BaseCheckboxPropsOverrides,
  DataGrid,
  DataGridProps,
} from "@mui/x-data-grid";
import React from "react";
import { theme } from "../../../theme/theme";
import Image from "../../atoms/Image";
import Uncheck from "../../../../public/assets/images/uncheck.svg";
import CheckedIcon from "../../../../public/assets/images/check.svg";
import InterminateIcon from "../../../../public/assets/images/interminate.svg";

export interface TableProps extends DataGridProps {
  width?: string;
}

const TableCheckbox = (props: BaseCheckboxPropsOverrides) => (
  <Checkbox
    icon={<Image src={Uncheck} />}
    checkedIcon={<Image src={CheckedIcon} />}
    indeterminateIcon={<Image src={InterminateIcon} />}
    {...props}
  />
);

const Table = (props: TableProps) => {
  const MuiDataGrid = styled(DataGrid)(`
    width:${props.width};
    border:none;
    & .MuiDataGrid-columnHeaders{
        border:0px;
        background:${theme.palette.structural.grey100};
        border-radius:8px;
        min-height:44px !important;
    }
    & .MuiDataGrid-columnHeaderTitle{
        color:${theme.palette.textColor.lowEmphasis};
        font-size:${theme.typography.body2.fontSize};
        font-weight:${theme.typography.body2.fontWeight};
        line-height:${theme.typography.body2.lineHeight};
    }
    & .MuiDataGrid-virtualScrollerContent{
        height:${props.rows.length * 62}px !important;
    }
    & .MuiDataGrid-columnHeader{
        padding:12px 20px;
        height:44px !important;
    }
    & .MuiDataGrid-columnHeader:focus{
        outline:none;
    }
    & .MuiDataGrid-columnSeparator{
        display:none;
    }
    & .MuiDataGrid-cell{
        border:none;
        padding:12px 20px;
        min-height:62px !important;
    }
    & .MuiDataGrid-root{
        border:none;
        width:70vw;
    }
    & .MuiDataGrid-row{
      min-height:62px !important;        
    }
    & .MuiDataGrid-row:hover{
        background:transparent;
    }
    & .MuiDataGrid-cell:focus{
        outline:none;
    }
    & .MuiDataGrid-columnHeaderCheckbox{
        padding:12px;
        width:44px;
        height:44px;
        & .MuiDataGrid-columnHeaderDraggableContainer{
            width: auto;
        }
    }
    & .MuiDataGrid-columnHeaderCheckbox:focus-within{
        outline:none;
    }
    & .MuiDataGrid-cellCheckbox.MuiDataGrid-cell:focus-within{
        outline:none;
    }
    & .MuiDataGrid-checkboxInput:hover{
        background:transparent;
    }
    & .MuiTouchRipple-root{
        display:none;   
    }
    & .MuiDataGrid-row.Mui-selected{
        background:${theme.palette.primary.primary600} !important;
    }
    & .MuiDataGrid-columnHeadersInner{
        height:44px;
    }
`);

  return (
    <MuiDataGrid
      {...props}
      hideFooter
      hideFooterPagination
      disableColumnMenu
      disableVirtualization
      components={{
        BaseCheckbox: TableCheckbox,
      }}
    />
  );
};

export default Table;
