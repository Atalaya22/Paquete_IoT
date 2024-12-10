/****** Object:  Table [dbo].[Info_Linia_Alarmes]    Script Date: 18/05/2020 16:24:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Info_Linies_Alarmes](
	[ID] [int] NOT NULL,
	[en] [varchar](255) NULL,
	[ca] [varchar](255) NULL,
	[fr] [varchar](255) NULL,
	[es] [varchar](255) NULL,
	[grup_en] [varchar](50) NULL,
	[grup_ca] [varchar](50) NULL,
	[grup_fr] [varchar](50) NULL,
	[grup_es] [varchar](50) NULL,
 CONSTRAINT [PK_Info_Linies_Alarmes] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Info_Linia_Info]    Script Date: 18/05/2020 16:24:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Info_Linies_Info](
	[Id] [int] NOT NULL,
	[Ca] [varchar](max) NULL,
	[Es] [varchar](max) NULL,
	[En] [varchar](max) NULL,
 CONSTRAINT [PK_Info_Linies_Info] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[Info_Linia_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (1008, N'Forward or reverse speed exceeding the speed limit of the servomotor. Edit parameter box. ', N'Velocitat d''avanç o retrocés superior al límit del servomotor. Modificar paràmetre de la caixa.', N'Vitesse d''avancée ou de recul supérieure à la vitesse limite du servomoteur. Éditer paramètre boîte', N'Velocidad de avance o retroceso superior a la velocidad límite del servomotor. Editar parámetro de caja. ', N'Feeder management', N'Gestió alimentadors', N'Gestion alimentateurs', N'Gestión alimentadores')
INSERT [dbo].[Info_Linia_Info] ([Id], [Ca], [Es], [En]) VALUES (0, N'Desconegut', N'Desconocido', N'Unknown')
INSERT [dbo].[Info_Linia_Info] ([Id], [Ca], [Es], [En]) VALUES (1, N'Interromput per alarma', N'Interrumpido por alarma', N'Aborted by alarm')
INSERT [dbo].[Info_Linia_Info] ([Id], [Ca], [Es], [En]) VALUES (2, N'Falta potència', N'Falta potencia', N'Power off')
INSERT [dbo].[Info_Linia_Info] ([Id], [Ca], [Es], [En]) VALUES (3, N'Falta marxa', N'Falta marcha', N'Waiting start')
INSERT [dbo].[Info_Linia_Info] ([Id], [Ca], [Es], [En]) VALUES (4, N'Canvi de format', N'Cambio de formato', N'Format change')
INSERT [dbo].[Info_Linia_Info] ([Id], [Ca], [Es], [En]) VALUES (5, N'Falta comanda', N'Falta comanda', N'Missing order')
INSERT [dbo].[Info_Linia_Info] ([Id], [Ca], [Es], [En]) VALUES (6, N'Esperant caixes', N'Esperando cajas', N'Waiting cases')
INSERT [dbo].[Info_Linia_Info] ([Id], [Ca], [Es], [En]) VALUES (7, N'Restablint', N'Restableciendo', N'Reseting')
INSERT [dbo].[Info_Linia_Info] ([Id], [Ca], [Es], [En]) VALUES (8, N'Estoc davant', N'Stock delante', N'Stock ahead')
INSERT [dbo].[Info_Linia_Info] ([Id], [Ca], [Es], [En]) VALUES (9, N'', N'', N'')
