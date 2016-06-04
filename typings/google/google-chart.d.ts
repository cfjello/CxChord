
declare module google
{
    export function load(namespace: string, version: number, settings: any);
    
    module visualization
    {
        export function arrayToDataTable(twoDArray: any[], firstRowIsData?: boolean): DataTable;
        export function drawChart(params: IChartWrapperOptions): void;
        export function drawToolbar(container: HTMLElement, components: IToolbarComponent[]): void;
        export function LineChart(container: HTMLElement): any;
        
        class DataTable
        {
            constructor(data?: any, version?: number);
            getNumberOfRows(): number;
            getNumberOfColumns(): number;
            clone(): DataTable;
            getColumnId(columnIndex: number): any;
            getColumnIndex(columnId: any): number;
            getColumnLabel(columnIndex: number): string;
            getColumnPattern(columnIndex: number): string;
            getColumnRole(columnIndex: number): string;
            getColumnType(columnIndex: number): string;
            getValue(rowIndex: number, columnIndex: number): any;
            getFormattedValue(rowIndex: number, columnIndex: number): string;
            setFormattedValue(rowIndex: number, columnIndex: number, formattedValue: string): void;
            setProperties(rowIndex: number, columnIndex: number, properties: any): void;
            getProperties(rowIndex: number, columnIndex: number): any;
            getProperty(rowIndex: number, columnIndex: number, name: string): any;
            setProperty(rowIndex: number, columnIndex: number, name: string, value: any): void;
            setCell(rowIndex: number, columnIndex: number, value?: any, formattedValue?: string, properties?: any);
            setRowProperties(rowIndex: number, properties: any): void;
            setRowProperty(rowIndex: number, name: string, value: any): void;
            getRowProperty(rowIndex: number, name: string): any;
            getRowProperties(rowIndex: number): any;
            setColumnLabel(columnIndex: number, newLabel: string): void;
            setColumnProperties(columnIndex: number, properties: any): void;
            setColumnProperty(columnIndex: number, name: string, value: any): void;
            getColumnProperty(columnIndex: number, name: string): any;
            getColumnProperties(columnIndex: number): any;
            insertColumn(atColIndex: number, type: string, label?: string, id?: string);
            addColumn(type: string, label?: string, id?: string): number;
            addColumn(description_object: IColumnDescription): number;
            insertRows(atRowIndex: number, numOfRows: number): void;
            insertRows(atRowIndex: number, populatedRows: any[]);
            addRows(numOrArray: number | any[]): number;
            addRow(cellArray?: ICell[]): number;
            getColumnRange(columnIndex: number): IRangeValue;
            getSortedRows(sortColumns: number): number[];
            getSortedRows(sortColumns: number[]): number[];
            getSortedRows(sortColumns: IColumnSortParams): number[];
            getSortedRows(sortColumns: IColumnSortParams[]): number[];
            sort(sortColumns: number);
            sort(sortColumns: number[]);
            sort(sortColumns: IColumnSortParams);
            sort(sortColumns: IColumnSortParams[]);
            getDistinctValues(column: number): any[];
            getFilteredRows(columnFilters: IFilter[]): any[];
            removeRows(fromRowIndex, numRows);
            removeRow(rowIndex: number): void;
            removeColumns(fromColIndex: number, numCols: number): void;
            removeColumn(colIndex: number): void;
            getTableProperties(): any;
            getTableProperty(name: string): any;
            setTableProperty(name: string, value: any): void;
            setTableProperties(properties: any): void;
            setValue(rowIndex: number, columnIndex: number, value: any): void;
            toJSON(): string;
            
        }
        
        class DataView
        {
            constructor(data: DataView | DataTable);
            static fromJSON(data: DataTable, viewAsJson: string);
            getColumnId(columnIndex: number): any;
            getColumnLabel(columnIndex: number): string;
            getColumnPattern(columnIndex: number): string;
            getColumnProperty(columnIndex: number, name: string): any;
            getColumnRange(columnIndex: number): IRangeValue;
            getColumnType(columnIndex: number): string;
            getDistinctValues(column: number): any[];
            getFilteredRows(columnFilters: IFilter[]): any[];
            getFormattedValue(rowIndex: number, columnIndex: number): string;
            getNumberOfColumns(): number;
            getProperties(rowIndex: number, columnIndex: number): any;
            getProperty(rowIndex: number, columnIndex: number, name: string): any;
            getRowProperty(rowIndex: number, name: string): any;
            getSortedRows(sortColumns: number): number[];
            getSortedRows(sortColumns: number[]): number[];
            getSortedRows(sortColumns: IColumnSortParams): number[];
            getSortedRows(sortColumns: IColumnSortParams[]): number[];
            getTableProperty(name: string): any;
            getValue(rowIndex: number, columnIndex: number): any;
            getTableColumnIndex(viewColumnIndex: number): number;
            getTableRowIndex(viewRowIndex: number): number;
            getViewColumnIndex(tableColumnIndex: number): number;
            getViewColumns(): number[];
            getViewRowIndex(tableRowIndex: number): number;
            getViewRows(): number[];
            hideColumns(columnIndexes: number[]): void;
            hideRows(min: number, max: number): void;
            hideRows(rowIndexes: number[]): void;
            setColumns(columnIndexes: (number | ICalculatedColumn)[]): void;
            setRows(min: number, max: number): void;
            setRows(rowIndexes: number[]): void;
            toDataTable(): DataTable;
            toJSON(): string;
        }
        
        class ChartWrapper
        {
            constructor(options?: string);
            constructor(options?: IChartWrapperOptions);
            clone(): ChartWrapper;
            toJSON(): string;
            draw(container?: HTMLElement | string);
            getDataSourceUrl(): string;
            getDataTable(): DataTable;
            getChartType(): string;
            getChartName(): string;
            getChart(): any;
            getContainerId(): string;
            getQuery(): string;
            getRefreshInterval(): number;
            getOption(key: string, defaultValue?: any): any;
            getOptions(): any;
            getView(): any;
            setDataSourceUrl(url: string);
            setDataTable(data: IDataTable);
            setDataTable(data: DataTable);
            setDataTable(data: any[]);
            setChartType(type: string);
            setChartName(name: string);
            setContainerId(id: string);
            setQuery(queryString: string);
            setRefreshInterval(interval: number);
            setOption(key: string, value: any);
            setOptions(options: any);
            setView(viewAsJson: string);
            setView(view: any);
            setView(views: any[]);
        }
        
        class ChartEditor
        {
            constructor();
            openDialog(chartWrapper: ChartWrapper, options?: any): void;
            getChartWrapper(): ChartWrapper;
            setChartWrapper(chartWrapper: ChartWrapper): void;
            closeDialog(): void;
        }
        
        interface IToolbarComponent
        {
            type: string;
            datasource?: string;
            gadget?: string;
            userprefs?: any;
            style: string;
        }
        
        interface IChartEditorOptions
        {
            dataSourceInput: string | HTMLElement;
        }
        
        interface IChartWrapperOptions
        {
            chartType: string;
            containerId: string;
            options?: any;
            dataTable?: IDataTable | DataTable | any[];
            dataSourceUrl?: string;
            query?: string;
            refreshInterval?: number;
            view?: any | any[];
        }
        
        interface ICalculatedColumn
        {
            calc?: (dataTable: DataTable, row: number) => any;
            type?: string;
            label?: string;
            id?: string;
            sourceColumn?: number;
            properties?: any;
            role?: string;
        }
        
        interface IColumnSortParams
        {
            column: number;
            desc?: boolean;
        }
        
        interface IFilter
        {
            column: number;
            test?: (cellValue: any, rowIndex: number, columnIndex: number, dataTable: DataTable) => boolean;
        }
        
        interface IRangeValue
        {
            min?: any;
            max?: any;
        }
        
        interface IValueFilter extends IFilter
        {
            value: any;
        }
        
        interface IRangeFilter extends IFilter
        {
            minValue?: any;
            maxValue?: any;
        }
        
        interface IColumnDescription
        {
            type: string;
            label?: string;
            id?: string;
            role?: string;
            pattern?: string;
        }
        
        interface IDataTable
        {
            cols: IColumnDescription[]
        }
        
        interface IRow
        {
            c: ICell[];
        }
        
        interface ICell
        {
            v: string | number | Date;
            f: string;
            p: any;
        }
        
        module events
        {
            export function addListener(sourceVisualization: any, event: string, handler: (arg?: any) => void): void;
            export function addOneTimeListener(sourceVisualization: any, event: string, handler: (arg?: any) => void): void;
            export function removeListener(handler: Function): void;
            export function removeAllListeners(sourceVisualization: any): void;
            export function trigger(sourceVisualization: any, event: string, eventArgs: any): void;
        }
        
        module data
        {
            export function group(dataTable: DataTable, keys: any, columns?:any): DataTable;
            export function join(dt1: DataTable, dt2: DataTable, joinMethod: string, dt1Columns: number[], dt2Columns: number[]): DataTable;
            export function month(date: Date): number;
            export function avg(arr: number[] | string[] | Date[]): number;
            export function count(arr: any[]): number;
            export function max(arr: number[]): number;
            export function max(arr: string[]): string;
            export function max(arr: Date[]): Date;
            export function min(arr: number[]): number;
            export function min(arr: string[]): string;
            export function mine(arr: Date[]): Date;
            export function sum(arr: number[] | string[] | Date[]): number;
        }
    }
}

declare module "google"
{
    export = google;
}